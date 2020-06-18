import React from 'react';
import {
  PlatformStateContext, Grid, GridItem, HeadingText, AreaChart, TableChart,
} from 'nr1';
import { timeRangeToNrql } from '@newrelic/nr1-community';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Nr1HowtoAddTimePicker extends React.Component {
    constructor(props){
        super(props)
        this.accountId = 1606862;
    }
  
    _getItems() {
        return [
            {
                team: 'Backend',
                company: 'Comtest',
                name: 'Web Portal',
                alertSeverity: 'CRITICAL',
                reporting: true,
                value: 0.9202394,
                commit: '0f58ef',
            },
            {
                team: 'Frontend',
                company: 'Comtest',
                name: 'Promo Service',
                alertSeverity: 'CRITICAL',
                reporting: true,
                value: 0.9123988,
                commit: 'e10fb3',
            },
            {
                team: 'DB',
                company: 'Comtest',
                name: 'Tower Portland',
                alertSeverity: 'CRITICAL',
                reporting: true,
                value: 0.82331,
                commit: 'ff8b07a',
            },
        ];
    }

    render() {
        const avgResTime = `SELECT average(duration) FROM Transaction FACET appName TIMESERIES AUTO `;
        const trxOverview = `FROM Transaction SELECT count(*) as 'Transactions', apdex(duration) as 'apdex', percentile(duration, 99, 95) FACET appName `;

        return (
            <PlatformStateContext.Consumer>
                {(PlatformState) => {
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
                                <TableChart fullWidth accountId={this.accountId} query={trxOverview+since} />
                                </main>
                            </GridItem>
                            <GridItem className="primary-content-container" columnSpan={6}>
                                <main className="primary-content full-height">
                                <HeadingText spacingType={[HeadingText.SPACING_TYPE.MEDIUM]} type={HeadingText.TYPE.HEADING_4}>
                                    Average Response Time
                                </HeadingText>
                                <AreaChart fullWidth accountId={this.accountId} query={avgResTime+since} />
                                </main>
                            </GridItem>
                            <GridItem className="primary-content-container" columnSpan={12}>
                            {/*  Build table here. */}
                            </GridItem>
                        </Grid>
                    </>
                    );
                }}
            </PlatformStateContext.Consumer>
        );
    }
}
