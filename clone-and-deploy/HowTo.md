# How To: Clone and deploy a Nerdpack
__Difficulty Level:__ Beginner
__Products:__ NA

## Getting Started
For this how-to example, we are going to be reviewing how to clone and deploy an application into your New Relic account. This process will work with any of the apps that you have developed, but for this example, we will be using one of the open-source applications maintained by New Relic.

We will be cloning and deploying the open-source 'nr1-observability-maps' application. You can find details about New Relic's open-source applications at developer.newrelic.com.

## Cloning an application
To follow along with this how-to, we will clone the [Observability Maps application from GitHub](https://github.com/newrelic/nr1-observability-maps):

```
git clone git@github.com:newrelic/nr1-observability-maps.git
```

After cloning the repo from Github, we will need to update the Nerdpack's UUID and install any dependencies that are required.

```
cd ./nr1-observability-maps
nr1 nerdpack:uuid -gf
npm install
```

Now that we have successfully cloned our application and updated the UUID to our profile; we can serve the app locally to test or handle any needed configuration.

To start a local server, run the following command in your terminal:

nr1 nerdpack:serve

After the application successfully builds and your server is ready, you will see a link to [https://one.newrelic.com/?nerdpacks=local](https://one.newrelic.com/?nerdpacks=local). On the homepage for New Relic One, you will see a launcher for the Observability Maps application.

![Observe Map LAUNCHER IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/clone-and-deploy/screenshots/observability-map-launcher.png)

If you click on the launcher, your locally running application will display.

![APP IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/clone-and-deploy/screenshots/observability-map-app.png)

## Deploying an application to production
After configuring and testing your application, you will want to deploy the app to production. In the next few steps, we will be deploying our applications and subscribing to our accounts to them.

The first step of deploying an application is publishing it to your account.

In your terminal, run the following command:

`nr1 nerdpack:publish`

If your app successfully builds, it will publish and deploy to your account into the DEV channel by default. In your terminal, you should see an output similar to the image below.

![PUBLISH IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/clone-and-deploy/screenshots/nerdpack-publish.png)

Finally, our app has been cloned, configured, and published. For our final step, we will subscribe to our account to the app deployed to the DEV channel.

In your terminal, run the following command:

`nr1 nerdpack:subscribe --channel=DEV`

After your account has subscribed to the application, you should be able to find your app in your account by going back to [https://one.newrelic.com](https://one.newrelic.com). Now, you and your team will have access to the given application without serving locally.

## How to clone and deploy a Nerdpack recap

Wrapping up this how-to example, if you've made it this far, you've successfully cloned an application from Github and deployed it for use in your New Relic account. Following the process above, you can implement any of the open-source apps found on the New Relic developer website or apps that have been created by your or your teams.

To continue your learning, take a look at our [self-paced workshop on Github](https://github.com/newrelic/nr1-workshop).

