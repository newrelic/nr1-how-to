# Add Time Picker to Queries

__Difficulty Level:__ Beginner

__Products:__ APM

## Getting Started
For this how-to example, we will be adding access to the time picker in New Relic One to our transaction overview application and adding the selected time to the queries used in the application's chart components.

To get started, we will clone the example applications from our how-to [GitHub](https://github.com/newrelic/nr1-how-to) repo:

Next, we will use the NR1 CLI to update the application UUID and run our application locally. In the terminal, let's change into the `/nr1-howto/add-time-picker` directory.

```
cd /nr1-howto/add-time-picker
```

Before moving forward, let's make sure we are getting data from the right New Relic account.  If you open the sample code in your preferred text editor, open the `/add-time-picker/nerdlets/nr1-howto-add-time-picker-nerdlet/index.js`.

In your text editor, you want to update the line below to include your account id.

```js
this.accountId = <REPLACE ME WITH YOUR ACCOUNT ID>;
```

_Note: Your account id is viewable in the profile selection menu of the developer center, where you downloaded in the nr1 CLI._

Now, we want to update the UUID and serve our application.

```
nr1 nerdpack:uuid -gf
nr1 nerdpack:serve
```

Once our app is successfully served, in your terminal, you'll be provided with a URL to access New Relic One and see your running application.

New Relic One link: https://one.newrelic.com/?nerdpacks=local

Now on the New Relic homepage, you should have a new launcher to the how-to example.

![How to launcher image](https://github.com/newrelic/nr1-how-to/blob/master/add-time-picker/screenshots/homepage-launcher.png)

After launching the **'Add Time Picker'** application, you will see a dashboard that gives an overview of the transactions in your New Relic account.

![Transaction Overview Application](https://github.com/newrelic/nr1-how-to/blob/master/add-time-picker/screenshots/add-timepicker.png)

## Adding Time Picker

When looking at the example application, you get an overview of the transaction telemetry data showing your account's transaction by application, average response time, HTTP response codes, and transaction errors.

By default, the application is showing your data within the last 60 minutes, but if there were a change made to the time in the time picker, you would notice the charts do not update. Currently, the transaction overview app isn't connected to the New Relic One platform and has no access to the data from the time picker.

In the steps going forward, we will add the time picker to our example application and add the time to our queries.

## Adding the PlatformStateContext Component

The first step in adding the time picker is to import the PlatformStateContext Component. We can find the component and details on how to import it on the APIs and components page on [https://developer.newrelic.com](https://developer.newrelic.com/client-side-sdk/index.html#apis/PlatformStateContext).

Once we've had a chance to visit the developer website and review the PlatformStateComponent, the first step is to import the component into our application's index.js file.

Add the following import statement to your `/nerdlets/nr1-howto-add-time-picker-nerdlet` index.js.

```js
import { PlatformStateContext } from ‘nr1’;
```

The `PlatformStateContext` component will wrap all of the code within the return statement of the render method, make a function call passing in the New Relic platform state and return all of the conde within our current return statement.

_It sounds like a lot, but it's not that bad. Promise :)_

We will start by wrapping all the code within the current return with the `PlatformStateContext` component.

```js
<PlatformStateContext.Consumer>
    {(platformState) => {
return (
// ADD THE CURRENT RETURN CODE HERE
)
}}
</PlatformStateContext.Consumer>
```

Making sure to add the current application code as the return of the PlatformState function call. Our return statement should now look like this:

```js
return (
    <PlatformStateContext.Consumer>
        {(PlatformState) => {
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
        }}
    </PlatformStateContext.Consumer>
);
```


Now that we have our platform state passed into our application, let's take a quick look at the data provided. We'll add a console.log statement to the PlatformStateContext return and take a look at our browser console.

Add the following code the PlatformState return statement just before the opening tag for the `<Grid>` component.

```js
/* Taking a peek at the PlatformState */
console.log(PlatformState);
```

If you take a look at your browser console, you should see something similar to below:

![Browser console image](https://github.com/newrelic/nr1-how-to/blob/master/add-time-picker/screenshots/console.png)

## Adding time data to your queries

In your console, you should see some data from the New Relic platform state, but now we want to take advantage of the timeRange data to update the charts in our Transaction overview app.

We'll start by importing another component. We're going to use the timeRangeToNrql utility method from the nr1 community library.  You can get more details on the nr1 community library from our [GitHub repo](https://github.com/newrelic/nr1-community). Import the `timeRangeToNrql` method using the line of code below.

```js
import { timeRangeToNrql } from '@newrelic/nr1-community';
```

We will pass the `PlatformState` to the `timeRangeToNrql` helper and save its output as our since statement for later use.

```js
const since = timeRangeToNrql(PlatformState);
console.log(since);
```

If you were to look in your console, you'd see the helper method takes your `PlatformState.timeRage` duration data, formats it from milliseconds, and returns a formatted `SINCE` statement to add to your `NRQL`.

After creating the since variable, go through the code in the `PlatformStateContext` return statement and concatenate the since variable to the existing chart component queries.

Your charts to should look similar to the `TableChart` below:

```js
<TableChart fullWidth accountId={this.accountId} query={trxOverview+since} />
```

After we've updated all of the chart components, the final index.js file should have code similar to the code below. This completed sample code is in your nerdlet final.js.


```js
import React from 'react';
import {
  PlatformStateContext,
  Grid,
  GridItem,
  HeadingText,
  AreaChart,
  TableChart,
  PieChart
} from 'nr1';
import { timeRangeToNrql } from '@newrelic/nr1-community';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Nr1HowtoAddTimePicker extends React.Component {
    constructor(props){
        super(props)
        this.accountId = 1;
    }
    render() {
        const avgResTime = `SELECT average(duration) FROM Transaction FACET appName TIMESERIES AUTO `;
        const trxOverview = `FROM Transaction SELECT count(*) as 'Transactions', apdex(duration) as 'apdex', percentile(duration, 99, 95) FACET appName `;
        const errCount = `FROM TransactionError SELECT count(*) as 'Transaction Errors' FACET error.message `;
        const responseCodes = `SELECT count(*) as 'Response Code' FROM Transaction FACET httpResponseCode `;

        return (
            <PlatformStateContext.Consumer>
                {(PlatformState) => {
                    /* Taking a peek at the PlatformState */
                    console.log(PlatformState)

                    const since = timeRangeToNrql(PlatformState);
                    console.log(since);

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
                            <GridItem className="primary-content-container" columnSpan={6}>
                                <main className="primary-content full-height">
                                <HeadingText spacingType={[HeadingText.SPACING_TYPE.MEDIUM]} type={HeadingText.TYPE.HEADING_4}>
                                    Response Code
                                </HeadingText>
                                <PieChart fullWidth accountId={this.accountId} query={responseCodes+since} />
                                </main>
                            </GridItem>
                            <GridItem className="primary-content-container" columnSpan={6}>
                                <main className="primary-content full-height">
                                <HeadingText spacingType={[HeadingText.SPACING_TYPE.MEDIUM]} type={HeadingText.TYPE.HEADING_4}>
                                    Transaction Errors
                                </HeadingText>
                                <PieChart fullWidth accountId={this.accountId} query={errCount+since} />
                                </main>
                            </GridItem>
                        </Grid>
                    </>
                    );
                }}
            </PlatformStateContext.Consumer>
        );
    }
}
```

## How to add the time picker recap

Wrapping up this how-to example, if you've made it this far, you've successfully implemented the time picker into your application, by importing the PlatformStateContext component and accessing its timePicker data object. To continue your learning, take a look at our [self-paced workshop on Github](https://github.com/newrelic/nr1-workshop).


