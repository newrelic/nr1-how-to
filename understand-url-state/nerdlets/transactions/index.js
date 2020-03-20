import React from 'react';
import PropTypes from 'prop-types';
import { NerdletStateContext, PlatformStateContext, Grid, GridItem, ChartGroup, AreaChart, BarChart, LineChart, PieChart, HeadingText} from 'nr1';

export default class MyNerdlet extends React.Component {
    static propTypes = {
        launcherUrlState: PropTypes.object,
        width: PropTypes.number,
        height: PropTypes.number,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <NerdletStateContext.Consumer>
                {(nerdletState) => (
                    <PlatformStateContext.Consumer>
                        {(platformState) => {
                            console.log(nerdletState);
                            const accountId = nerdletState.accountId;
                            const facet = `FACET ${nerdletState.facet}`;

                            const { duration } = platformState.timeRange;
                            const since = ` SINCE ${duration/1000/60} MINUTES AGO `;
                            const errors = `SELECT count(error) FROM Transaction TIMESERIES`;
                            const throughput = `SELECT count(*) as 'throughput' FROM Transaction TIMESERIES`;
                            const transaction_apdex_by_appname = `SELECT count(*) as 'transaction', apdex(duration) as 'apdex' FROM Transaction limit 25`;

                            return <React.Fragment>
                                <ChartGroup>
                                    <Grid>
                                        <GridItem columnSpan={12}>
                                            <HeadingText className="heading" type={HeadingText.TYPE.HEADING_1}>Transactions facted by {nerdletState.facet}</HeadingText>
                                        </GridItem>
                                        <GridItem columnSpan={6}>
                                            <LineChart
                                                query={throughput+since+facet}
                                                accountId={accountId}
                                                className="chart"
                                                onClickLine={(line) => {
                                                    console.debug(line); //eslint-disable-line
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem columnSpan={6}>
                                            <PieChart
                                                className="chart"
                                                query={transaction_apdex_by_appname+since+facet}
                                                accountId={accountId}
                                            />
                                        </GridItem>
                                        <GridItem columnSpan={6}>
                                            <AreaChart
                                                query={throughput+since+facet}
                                                accountId={accountId}
                                                className="two-col-chart"
                                                onClickLine={(line) => {
                                                    console.debug(line); //eslint-disable-line
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem columnSpan={6}>
                                            <BarChart
                                                className="two-col-chart"
                                                query={errors+since+facet}
                                                accountId={accountId} />
                                        </GridItem>
                                    </Grid>
                                </ChartGroup>
                            </React.Fragment>;
                        }}
                    </PlatformStateContext.Consumer>
                )}
        </NerdletStateContext.Consumer>
    }
}