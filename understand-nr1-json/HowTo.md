# Understand the nr1.json files

__Difficulty Level:__ Beginner
__Products:__ NA

## Getting Started
For this how-to example, we will be adding access to the time picker in New Relic One to our transaction overview application and adding the selected time to the queries used in the application's chart components.

To get started, clone the example applications from the how-to [GitHub](https://github.com/newrelic/nr1-how-to) repo:

Next, we will use the NR1 CLI to update the application UUID and run our application locally. In the terminal, change into the `/nr1-howto/understand-nr1-json` directory.

```bash
cd /nr1-howto/understand-nr1-json
```

Now, you will want to update the UUID and serve your application.

```bash
nr1 nerdpack:uuid -gf
nr1 nerdpack:serve
```

Once your app is successfully served, in the terminal, you'll be provided with a URL to access New Relic One and see your running application.

New Relic One link: [https://one.newrelic.com/?nerdpacks=local](https://one.newrelic.com/?nerdpacks=local)

Now on the New Relic homepage, you should have a new launcher to the how-to example.

![How to launcher image](https://github.com/newrelic/nr1-how-to/blob/master/understand-nr1-json/screenshots/app-launcher.png)

## Understanding the launcher nr1.json
Now that you have the application serving in New Relic One, click the launcher for 'How To: Understand nr1.json'. You should see a 404 error page similar to the one below:

![404 ERROR IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/understand-nr1-json/screenshots/missing-nerdlet.png)

To better understand this error, open the __*./nr1-howto/understand-nr1-json/launchers*__ directory and open the nr1.json file in the editor of your choice.

Inside of the nr1.json, you should see an object similar to the code below:

```js
{
    "schemaType": "LAUNCHER",
    "id": "understand-nr1-json-launcher",
    "displayName": "Understand nr1.json",
    "description": "Understand the nr1.json file",
    "rootNerdletId": "REPLACE ME WITH NERDLET ID"
}
```

This nr1.json object is the first of three configuration objects that you will find in your New Relic applications.

This object is explicitly configuring the launcher and starts by specifying a schema type of `LAUNCHER` and then providing the needed values for the launcher's id, display name, description, and Nerdlet root id.

The `id` provides a unique identifier for your application launcher, the `displayName` will show on the launcher tile on the New Relic One homepage, and the `description` will display a user hovers the 'i' icon in the lower right corner of the launcher.

The `rootNerdletId` in the example is going to be the key to solving the current 404 error. When clicking a launcher in New Relic One, the `rootNerdletId` key specifies which application the platform needs to launch. In its current state, the application does not have a Nerdlet. To solve the 404 error, a Nerdlet needs to is needed, and the launcher's `nr1.json` needs an update.

## Understanding the Nerdlet nr1.json
We need to add a Nerdlet to the __'Understanding nr1.json'__ application. In your terminal, run the following command to create a Nerdlet.

```bash
nr1 create --type nerdlet --name awesome-nerdlet
```

After you've run the command, you will see a new Nerdlets directory and Nerdlet named __'awesome-nerdlet'__ in your Nerdpack directory. Navigate to your __'./nr1-howto/understand-nr1-json/nerdlets/awesome-nerdlet'__ directory and open the nr1.json file.

Inside of the nr1.json, you should see an object similar to the code below:

```js
{
    "schemaType": "NERDLET",
    "id": "awesome-nerdlet",
    "displayName": "Awesome Nerdlet",
    "description": "This is such an amazing Nerdlet. Best ever? Who knows..."
}
```

The Nerdlet nr1.json file looks a lot like the one in the launcher directory. The object specifies a schema type, gives the Nerdlet a unique id, defines the display name text that will show in the header of your Nerdlet, and the application descriptions.

For the launcher to launch this Nerdlet, the `rootNerdletId` in the launcher's nr1.json and the `id` in the Nerdlet's nr1.json need to be an exact match or the user will see a 404 error like the one seen before.

Let's update the launcher's nr1.json file making sure it has the correct `rootNerdletId.` Update your object with the line below:

```js
"rootNerdletId": "awesome-nerdlet"
```

Your launcher's complete nr1.json object should look like:

```js
{
    "schemaType": "LAUNCHER",
    "id": "understand-nr1-json-launcher",
    "displayName": "Understand nr1.json",
    "description": "Understand the nr1.json file",
    "rootNerdletId": "REPLACE ME WITH NERDLET ID"
}
```

Next, restart your server and head back to the New Relic One homepage to launch the application.

__*Anytime you make a change to the nr1.json files in your application, you will need to restart your server to see the changes.*__

You will now be able to use the 'How to understand nr1.json' launcher to launch the   'Awesome Nerdlet' seeing the screen below.

![AWESOME NERDLET](https://github.com/newrelic/nr1-how-to/blob/master/understand-nr1-json/screenshots/awesome-nerdlet.png)

We're going to make a couple more edits to the Nerdlet's nr1.json file to extend the way you can access this application. Not all New Relic applications need a launcher to accessed by users. We are going to update the config object to connect the Nerdlet to an entity type.

Update the Nerdlet's nr1.json file with the code below:

```js
"entities": [{ "domain": "APM", "type": "APPLICATION" }],
"actionCategory": "monitor"
```

Your Nerdlet's complete nr1.json object should look like:

```js
{
    "schemaType": "NERDLET",
    "id": "awesome-nerdlet",
    "displayName": "Awesome Nerdlet",
    "description": "This is such an amazing Nerdlet. Best ever? Who knows...",
    "entities": [{ "domain": "APM",  "type": "APPLICATION" }],
    "actionCategory": "monitor"
}
```

By adding the entities and action category attributes, we have made a connection between the Nerdlet and any of the APM applications you have in your account. If you go back to the New Relic One homepage,  launch the Entity Explorer, and select one of your APM applications from the Services menu.  You will see the Awesome Nerdlet link in the left navigation similar to the screen below:

![Service Nerdlet](https://github.com/newrelic/nr1-how-to/blob/master/understand-nr1-json/screenshots/entity-nerdlet.png)

## Understanding the Nerdpack nr1.json
Now that we've reviewed the launcher and Nerdlets nr1.json file, we only have one more to go. In the root of the application, there is a final nr1.json file, open it in the editor of your choice.

Inside of the nr1.json, you should see an object similar to the code below:

```js
{
    "schemaType": "NERDPACK",
    "id": "eac36abe-d5fa-4139-9c07-81c739ede55e",
    "displayName": "Understand nr1.json",
    "description": "Nerdpack understand-nr1-json"
}
```

This object handles configuration for the entire Nerdpack package specifying the schema type of Nerdpack. Every Nerdpack has a unique identifier called a __'uuid'__ shown as the `id,` and the display and description allow you to add details about your complete application.

## How to use the NerdGraph component recap
Wrapping up this how-to example, we've reviewed all three of the nr1.json configuration objects in your account. And, you've successfully made a connection from the app launcher to the Nerdlet, and connected the Nerdlet to all APM applications in your account.

To continue your learning, take a look at our [self-paced workshop on Github](https://github.com/newrelic/nr1-workshop).