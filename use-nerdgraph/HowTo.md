# Use the NerdGraphQuery component
__Difficulty Level:__ Intermediate
__Products:__ APM

## Getting Started
For this how-to example, we will be adding the NerdGraph component to our transaction overview application to query data from our account and add it to a dropdown menu.

NerdGraph is New Relic's GraphQl implementation. GraphQL has some key differences when compared to REST. For example, it's the client, not the server, that determines what data will be returned. Also, it becomes easy to collect data from multiple sources. In the case of New Relic, we'll see you can get account information, data about infrastructure, and issue an NRQL request, all in one GraphQL query. [Explore NerdGraph](https://api.newrelic.com/graphiql)

To get started, we will clone the example applications from our [how-to GitHub repo](https://github.com/newrelic/nr1-how-to):

Next, we will use the NR1 CLI to update the application UUID and run our application locally. In the terminal, let's change into the `/nr1-howto/use-nerdgraph` directory.

```bash
cd /nr1-howto/use-nerdgraph
```

Before moving forward, let's make sure we are getting data from the right New Relic account. If you open the sample code in your preferred text editor, open the `/use-nerdgraphd/nerdlets/use-nerdgraph-nerdlet/index.js`.

In your text editor, you want to update the line below to include your account id.

```js
this.accountId = <REPLACE ME WITH YOUR ACCOUNT ID>;
```

Note: Your account id is viewable in the profile selection menu of the developer center, where you downloaded in the nr1 CLI.

Now, we want to update the UUID and serve our application.

```bash
nr1 nerdpack:uuid -gf
nr1 nerdpack:serve
```

Once our app is successfully served, in your terminal, you'll be provided with a URL to access New Relic One and see your running application.

New Relic link: [https://one.newrelic.com/?nerdpacks=local](https://one.newrelic.com/?nerdpacks=local)

Now on the New Relic homepage, you should have a new launcher to the how-to example.

![Use Nerdgraph launcher](https://github.com/newrelic/nr1-how-to/blob/master/use-nerdgraph/screenshots/use-nerdgraph-launcher.png)

After launching the 'Use NerdGraph application, you will see a dashboard that gives an overview of the transactions in your New Relic account.

![HOW TO SCREENSHOT](https://github.com/newrelic/nr1-how-to/blob/master/use-nerdgraph/screenshots/no-name.png)

## Adding the NerdGraphQuery component

In this application, you will see an overview of the Transaction data that is your account. By following the instructions in this how-to, you will add the __NerdGraphQuery__ component to access to build a dropdown menu to change the account the application is viewing.

The first step is to import the NerdGraphQuery Component. We can find the component and details on how to import it on the APIs and components page on [https://developer.newrelic.com/client-side-sdk/index.html#data-fetching/NerdGraphQuery](https://developer.newrelic.com/client-side-sdk/index.html#data-fetching/NerdGraphQuery).

Please take a moment to get caught up on the `NerdGraphQuery` component, then import the component into our application's index.js file.

Add the `NerdGraphQuery` component into the first `StackItem` inside of the `return` in the index.js file.

```js
<NerdGraphQuery query={query} variables={variables}>
    {({loading, error, data}) => {
        console.log({loading, error, data})
        if (loading) {
            return <Spinner />;
        }
        if (error) {
            return 'Error!';
        }
        return null;
    }}
</NerdGraphQuery>
```

The NerdGraphQuery component takes an an query object that states the what source you’d like to access and the data you want to have returned. Add the following code to your index.js file in the `render` method.

```js
const query = `
    query($id: Int!) {
        actor {
            account(id: $id) {
                name
            }
        }
    }
`;
```


If you take a look at your browser console, you should see something similar to below:

![BROWSER CONSOLE IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/use-nerdgraph/screenshots/console-screenshot.png)

You can see the data from your query returned in an object following the same structure of the object provided in the initial query. Now, you want to take the data returned by the NerdGraph query and display it in the application.

Replace the `return null` in the current __NerdGraphQuery__ component with the `return` statement below.

```js
return <HeadingText>{data.actor.account.name} Apps:</HeadingText>;
```

If you go back to the browser and view your application, you will see a new headline showing the name of your account returned from __NerdGraph__.

![App Image](https://github.com/newrelic/nr1-how-to/blob/master/use-nerdgraph/screenshots/with-name.png)

## Using the NerdGraphQuery.query

We have implemented the NerdGraphQuery component with the application's `render` method and displayed the return data within the transaction overview application.

Now, we want to be able to query __NerdGraph__ outside of the render method and save the returned data for later usage throughout the NR1 app. To do this, we will use the `NerdGraphQuery.query` method within the `componentDidMount` react lifecycle method.

Add the following code into the `index.js` just under the `constructor.`

```js
componentDidMount(){
    const accountId = this.state;
    const gql = `{ actor { accounts { id name } } }`;

    const accounts = NerdGraphQuery.query({query: gql})
    accounts.then(results => {
        console.log('Nerdgraph Response:', results);
        const accounts = results.data.actor.accounts.map(account => {
            return account;
        });
        const account = accounts.length > 0 && accounts[0];
        this.setState({ selectedAccount: account, accounts });
    }).catch((error) => { console.log('Nerdgraph Error:', error); })
}
```

In the code, we just added to the transaction app a few things would happen after the HTML in the render method is successfully rendered, and the `componentDidMount` lifecycle method has been called.

The `NerdGraphQuery.query` method called with the query object to get your account data will be stored into a variable called accounts. Once the response has come back from __NerdGraph__, the results will be logged to the browser console for your viewing, processed, and stored into the application state.

After the data is stored into state, we want to use it to display and account selection for users to change accounts and update the application quickly.

Add the following code into the second `StackItem` in the index.js return statement.

```js
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
```

If you look at the application in your browser, you will see a dropdown menu that displays the data returned from the `NerdGraphQuery.query` and allows the user to select an account. Once a new account is selected, the application will render showing data from the new selection.

![App Complete](https://github.com/newrelic/nr1-how-to/blob/master/use-nerdgraph/screenshots/complete.png)

The final index.js file should have code similar to the code below. This completed sample code is in your nerdlet final.js.

```js
import React from 'react';
import { PlatformStateContext, NerdGraphQuery, Spinner, HeadingText, Grid, GridItem, Stack, StackItem, Select, SelectItem, AreaChart, TableChart, PieChart } from 'nr1'
import { timeRangeToNrql } from '@newrelic/nr1-community';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class UseNerdgraphNerdletNerdlet extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            accountId: <YOUR ACCOUNT ID>,
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

```

## How to use the NerdGraph component recap

Wrapping up this how-to example, you've successfully queried data from your account using the NerdGraphQuery component. Using the NerdGraphQuery.query method has allows the separation of querying data and visualization. For more experience querying your data with NerdGraph, use [New Relic's GraphQL](https://api.newrelic.com/graphiql) tool to explore what's possible.

To continue your learning, take a look at our [self-paced workshop on Github](https://github.com/newrelic/nr1-workshop).



