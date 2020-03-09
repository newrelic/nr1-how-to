import React from 'react';
import { PlatformStateContext, NerdGraphQuery, Spinner, HeadingText, Grid, GridItem, Stack, StackItem, Select, SelectItem, AreaChart, TableChart, PieChart } from 'nr1'
import { timeRangeToNrql } from '@newrelic/nr1-community';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class UseNerdgraphNerdletNerdlet extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            accountId: <REPLACE ACCOUNT ID>,
            accounts: null,
            selectedAccount: null,
        }
    }

    /* Add componentDidMount here */

    /* Add componentDidMount here */

    selectAccount(option) {
        this.setState({ accountId: option.id,selectedAccount: option });
    }


    render() {
        const { accountId, accounts, selectedAccount  } = this.state;
        console.log({accountId, accounts, selectedAccount});

        {/* Add query here*/}

        {/* Add query here*/}

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
                {/* Add NerdGraphQuery component here */}

                {/* Add NerdGraphQuery component here */}
                </StackItem>
                {/* Add the account picker here */}

                {/* Add the account picker here */}
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
