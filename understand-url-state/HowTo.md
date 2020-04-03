# Understand Nerdlet URL State
__Difficulty Level:__ Intermediate
__Products:__ N/A

## Getting Started
For this how-to example, we are going through examples of how you can access the Nerdlet URL state using the nr1 SDK in the applications you build on the New Relic platform.

To get started, we will clone the example applications from our how-to [GitHub](https://github.com/newrelic/nr1-how-to) repo:

Next, we will use the NR1 CLI to update the application UUID and run our application locally. In the terminal, change into the `/nr1-howto/understand-url-state` directory.

```bash
cd /nr1-howto/understand-url-state
```

Now, we want to update the UUID and serve our application.

```bash
nr1 nerdpack:uuid -gf
nr1 nerdpack:serve
```

Once your app is successfully served, in the terminal, you'll be provided with a URL to access New Relic One and see your running application.

New Relic One link: [https://one.newrelic.com/?nerdpacks=local](https://one.newrelic.com/?nerdpacks=local)

Now on the New Relic homepage, you should have a new launcher to the how-to example.

![How to launcher image](https://github.com/newrelic/nr1-how-to/blob/master/understand-url-state/screenshots/launcher.png)

## Understanding the URL state

If you were to copy and paste the URL from the local running how-to example, you should have a long URL that looks something like below:

```js
https://one.newrelic.com/launcher/dabfdfb9-2e49-4775-ac23-4adbcfac51e4.understand-url-state-launcher?nerdpacks=local&launcher=eyJ0aW1lUmFuZ2UiOnsiYmVnaW5fdGltZSI6bnVsbCwiZW5kX3RpbWUiOm51bGwsImR1cmF0aW9uIjoxODAwMDAwfSwiJGlzRmFsbGJhY2tUaW1lUmFuZ2UiOnRydWV9&pane=eyJuZXJkbGV0SWQiOiJkYWJmZGZiOS0yZTQ5LTQ3NzUtYWMyMy00YWRiY2ZhYzUxZTQudW5kZXJzdGFuZC11cmwtc3RhdGUtbmVyZGxldCIsImZvbyI6ImJhciJ9
```

What a long URL! But, what's really going on here?

This long hash in the URL contains information about the application's state. The information stored in the URL is arbitrary and used to be able to point back to the same state that was initially shared.

Encoded into the URL could be information similar to below and more about your application state:

```js
pane = {
  "nerdletId": "understand-url-state",
  "entityDomain": "APM",
  "entityType": "APPLICATION",
}
```

## Reading the Nerdlet URL state

After getting an understanding of the application URL and the fact that it contains a hash with your application state, we want to be able to store and access data from the Nerdlet URL.

We'll implement the NerdleStateContext component into our running application and how we can read data stored in the URL. You can find details about the component on the API and components page on [developer.newrelic.com](https://developer.newrelic.com/client-side-sdk/index.html#apis/NerdletStateContext)

In the text editor of your choice, navigate to the __'./nr1-howto/understand-url-state/nerdlets/understand-url-state-nerdlet'__ and open the `index.js` file.

In the `index.js` import the `NerdletStateContext` component. After importing the __NerdStateContext__ replace the file's render method with the code below:

```js
render() {
    return (
        <React.Fragment>
            <NerdletStateContext.Consumer>
            {(nerdletState) => {
                console.log('Nerdlet URL State:', nerdletState);
                return null
            }}
            </NerdletStateContext.Consumer>
        </React.Fragment>
    )
}
```

__This application is extending APM and BROWSER applications in New Relic One, access it from one of your services using the entity explorer.__

Your Nerdlet's render method id returning `null` show your application should be black in your browser but open your browser console and you should see something similar to below:

![App Console](https://github.com/newrelic/nr1-how-to/blob/master/understand-url-state/screenshots/application-console.png)

The `nerdletState` is logged to your browser console before the app returns `null.` By default, the `entityGuid` is decoded from the URL and included in the `nerdletState.`

## Storing data in the Nerdlet URL State

In the last section, you used the `NerdletStateContext` component to access the data stored in your application's URL and saw that by default, you're provided the `entityGuid` for the service you've selected in the Entity Explorer.

Let's see how more data can be added to your URL state and accessed within the running application.

From the [New Relic developer website](https://developer.newrelic.com/client-side-sdk/index.html#apis/nerdlet), we need another platform API component. Import `nerdlet` into your application. And in your index.js file, inside of the `render` method just before the `return` add the following code:

```js
nerdlet.setUrlState({
    foo: 'bar',
    fizz: 'buzz',
    cool: true,
    number: 1,
 });
```

Using the `nerdlet.setUrlState()` is similar to using React's `setState.` It performs a shallow merge between the current URL state and the provided state in the urlState parameter.

The data we added is arbitrary, but if you look at your browser console again, you will see the following:

![Added State](https://github.com/newrelic/nr1-how-to/blob/master/understand-url-state/screenshots/added-state.png)

Showing we can store data in the application URL state and then access it within an application using the __NerdletStateContext__ component.

## Navigating and passing URL state

You can also pass data into your URL state while navigating inside your application. We're going to update the running application to link a second Nerdlet and pass data into the URL.

Update your import statement to match below:

```js
import { PlatformStateContext, NerdletStateContext, navigation, nerdlet, BlockText, Button } from 'nr1';
```

Add a constructor method to your app and add your account id:

```js
constructor(props){
    super(props)
    this.accountId =  '<REPLACE ME WITH YOUR ID>';
}
```

Replace your render method with the code below:

```js
render() {
    return (
        <React.Fragment>
            <NerdletStateContext.Consumer>
            {(nerdletState) => {
                console.log('Nerdlet URL State:', nerdletState);
                return <div className="launch-btn">
                    <BlockText
                        spacingType={[BlockText.SPACING_TYPE.MEDIUM]}
                        type={BlockText.TYPE.PARAGRAPH}>
                        Click this button to launch the Transaction Nerdlet.
                    </BlockText>
                    <Button
                        to={location}
                        type={Button.TYPE.PRIMARY}
                        iconType={Button.ICON_TYPE.DOCUMENTS__DOCUMENTS__NOTES__A_ADD}
                    >
                        Launch Transactions App
                    </Button>
                </div>
            }}
            </NerdletStateContext.Consumer>
        </React.Fragment>
    )
}
```

Go back to the application in your browser, and you will see the screen below. But, if you click the launch button, you will notice it doesn't take you to the Transactions App.

![Launch Button](https://github.com/newrelic/nr1-how-to/blob/master/understand-url-state/screenshots/launch-button.png)

To navigate to the Transactions Nerdlet, let's use the `navigation` platform API. Details about the navigation API can be found on the [developer website](https://developer.newrelic.com/client-side-sdk/index.html#apis/navigation).

Inside of the `render` method in the `index.js` file, add the following line code above the return statement.

```js
const location = navigation.getOpenNerdletLocation(nerdlet);
```

The `navigation.getOpenNerdletLocation` will return a location object that can be used by the `Button` component, but we need to create the nerdlet object being passed. This nerdlet object will direct the button to the Transactions Nerdlet by its `id` and update the `urlState.`

```js
const nerdlet = {
    id: 'transactions',
    urlState: {
        facet: 'appName',
        accountId: this.accountId,
    },
};
```

Now the location object can be added to the `Button` component by using its `to` prop. Update your `Button` with the code below:

```js
<Button
    to={location}
    type={Button.TYPE.PRIMARY}
    iconType={Button.ICON_TYPE.DOCUMENTS__DOCUMENTS__NOTES__A_ADD}
 >
```

Going back to the application and clicking on the launch button in your browser will now take you to the Transaction Application. Your screen should look similar to below:

![Transaction App](https://github.com/newrelic/nr1-how-to/blob/master/understand-url-state/screenshots/transaction-app.png)

Looking at the application on the screen, you will see a transaction overview faceted by App Name. And, if you navigate to __'./nr1-howto/understand-url-state/nerdlets/transactions/index.js'__ you can see how the application is using the NerdletStateContext component to read the data added into the URL state.

## How to add the time picker recap

Wrapping up this how-to example, you've successfully decoded data from the Nerdlet's URL state and updated the state with new data using the `NerdletStateContext and `nerdlet` Platform API components. Then using the `navigation.getOpenNerdletLocation` method you linked to a Nerdlet while updating the URL state to be accessed by that Nerdlet.

More detail about the various New Relic Platform APIs and how to use them can be found on the [developer website](https://developer.newrelic.com/client-side-sdk/index.html#apis/NerdletStateContext).

To continue your learning, take a look at our [self-paced workshop on Github](https://github.com/newrelic/nr1-workshop).