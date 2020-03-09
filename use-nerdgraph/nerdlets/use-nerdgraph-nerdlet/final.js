import React from 'react';
import { PlatformStateContext, NerdGraphQuery, Spinner, HeadingText, Grid, GridItem, Stack, StackItem, Select, SelectItem, AreaChart, TableChart, PieChart } from 'nr1'
import { timeRangeToNrql } from '@newrelic/nr1-community';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class UseNerdgraphNerdletNerdlet extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            accountId: 630060,
            accounts: null,
            selectedAccount: null,
        }
    }

    componentDidMount(){
        const accountId = this.state;
        const gql = `{ actor { accounts { id name } } }`;

        const accounts =  NerdGraphQuery.query({query: gql})
        accounts.then(results => {
            console.log('Nerdgraph Response:', results);
            const accounts = results.data.actor.accounts.map(account => {
                return account;
            });
            const account = accounts.length > 0 && accounts[0];
            this.setState({ selectedAccount: account, accounts });
        }).catch((error) => { console.log('Nerdgraph Error:', error); })
    }

    selectAccount(option) {
        this.setState({ accountId: option.id,selectedAccount: option });
    }


    render() {
        const { accountId, accounts, selectedAccount  } = this.state;
        console.log({accountId, accounts, selectedAccount});

        const query = `
            query($id: Int!) {
                actor {
                    account(id: $id) {
                        name
                    }
                }
            }
        `;

        const variables = {
        id: accountId,
        };

        const avgResTime = `SELECT average(duration) FROM Transaction FACET appName TIMESERIES AUTO `;
        const trxOverview = `FROM Transaction SELECT count(*) as 'Transactions', apdex(duration) as 'apdex', percentile(duration, 99, 95) FACET appName `;
        const errCount = `FROM TransactionError SELECT count(*) as 'Transaction Errors' FACET error.message `;
        const responseCodes = `SELECT count(*) as 'Response Code' FROM Transaction FACET httpResponseCode `;

        return (
            <Stack
                fullWidth
                horizontalType={Stack.HORIZONTAL_TYPE.FILL}
                gapType={Stack.GAP_TYPE.EXTRA_LOOSE}
                spacingType={[Stack.SPACING_TYPE.MEDIUM]}
                directionType={Stack.DIRECTION_TYPE.VERTICAL}>
                <StackItem>
                    <NerdGraphQuery query={query} variables={variables}>
                        {({loading, error, data}) => {
                            if (loading) {
                                return <Spinner />;
                            }

                            if (error) {
                                return 'Error!';
                            }

                            return <HeadingText>{data.actor.account.name} Apps:</HeadingText>;
                        }}
                    </NerdGraphQuery>
                </StackItem>
                {accounts &&
                    <StackItem>
                        <Select value={selectedAccount} onChange={(evt, value) => this.selectAccount(value)}>
                        {accounts.map(a => {
                            return <SelectItem key={a.id} value={a}>
                            {a.name}
                            </SelectItem>
                        })}
                        </Select>
                    </StackItem>
                }
                <StackItem>
                <hr />
                    <PlatformStateContext.Consumer>
                    {(PlatformState) => {
                        /* Taking a peek at the PlatformState */
                        const since = timeRangeToNrql(PlatformState);
                        return (
                        <>
                            <Grid
                            className="primary-grid"
                            spacingType={[Grid.SPACING_TYPE.NONE, Grid.SPACING_TYPE.NONE]}
                            >
                                <GridItem className="primary-content-container" columnSpan={6}>
                                    <main className="primary-content full-height">
                                    <HeadingText spacingType={[HeadingText.SPACING_TYPE.MEDIUM]} type={HeadingText.TYPE.HEADING_4}>
                                        Transaction Overview
                                    </HeadingText>
                                    <TableChart fullWidth accountId={accountId} query={trxOverview+since} />
                                    </main>
                                </GridItem>
                                <GridItem className="primary-content-container" columnSpan={6}>
                                    <main className="primary-content full-height">
                                    <HeadingText spacingType={[HeadingText.SPACING_TYPE.MEDIUM]} type={HeadingText.TYPE.HEADING_4}>
                                        Average Response Time
                                    </HeadingText>
                                    <AreaChart fullWidth accountId={accountId} query={avgResTime+since} />
                                    </main>
                                </GridItem>
                                <GridItem className="primary-content-container" columnSpan={6}>
                                    <main className="primary-content full-height">
                                    <HeadingText spacingType={[HeadingText.SPACING_TYPE.MEDIUM]} type={HeadingText.TYPE.HEADING_4}>
                                        Response Code
                                    </HeadingText>
                                    <PieChart fullWidth accountId={accountId} query={responseCodes+since} />
                                    </main>
                                </GridItem>
                                <GridItem className="primary-content-container" columnSpan={6}>
                                    <main className="primary-content full-height">
                                    <HeadingText spacingType={[HeadingText.SPACING_TYPE.MEDIUM]} type={HeadingText.TYPE.HEADING_4}>
                                        Transaction Errors
                                    </HeadingText>
                                    <PieChart fullWidth accountId={accountId} query={errCount+since} />
                                    </main>
                                </GridItem>
                            </Grid>
                        </>
                        );
                    }}
                    </PlatformStateContext.Consumer>
                </StackItem>
            </Stack>
        )
    }
}
