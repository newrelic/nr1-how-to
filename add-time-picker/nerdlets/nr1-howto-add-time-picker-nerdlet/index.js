import React from 'react';
import {
  Grid,
  GridItem,
  HeadingText,
  AreaChart,
  TableChart,
  PieChart
} from 'nr1';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Nr1HowtoAddTimePicker extends React.Component {
    constructor(props){
        super(props)
        this.accountId = "<ADD YOUR ACCOUNT ID>";
    }
    render() {
        const avgResTime = `SELECT average(duration) FROM Transaction FACET appName TIMESERIES AUTO`;
        const trxOverview = `FROM Transaction SELECT count(*) as 'Transactions', apdex(duration) as 'apdex', percentile(duration, 99, 95) FACET appName`;
        const errCount = `FROM TransactionError SELECT count(*) as 'Transaction Errors' FACET error.message`;
        const responseCodes = `SELECT count(*) as 'Response Code' FROM Transaction FACET httpResponseCode`;
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
                <TableChart fullWidth accountId={this.accountId} query={trxOverview} />
                </main>
            </GridItem>
            <GridItem className="primary-content-container" columnSpan={6}>
                <main className="primary-content full-height">
                <HeadingText spacingType={[HeadingText.SPACING_TYPE.MEDIUM]} type={HeadingText.TYPE.HEADING_4}>
                    Average Response Time
                </HeadingText>
                <AreaChart fullWidth accountId={this.accountId} query={avgResTime} />
                </main>
            </GridItem>
            <GridItem className="primary-content-container" columnSpan={6}>
                <main className="primary-content full-height">
                <HeadingText spacingType={[HeadingText.SPACING_TYPE.MEDIUM]} type={HeadingText.TYPE.HEADING_4}>
                    Response Code
                </HeadingText>
                <PieChart fullWidth accountId={this.accountId} query={responseCodes} />
                </main>
            </GridItem>
            <GridItem className="primary-content-container" columnSpan={6}>
                <main className="primary-content full-height">
                <HeadingText spacingType={[HeadingText.SPACING_TYPE.MEDIUM]} type={HeadingText.TYPE.HEADING_4}>
                    Transaction Errors
                </HeadingText>
                <PieChart fullWidth accountId={this.accountId} query={errCount} />
                </main>
            </GridItem>
        </Grid>
        </>
        );
    }
}