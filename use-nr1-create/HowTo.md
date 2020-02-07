Difficulty Level: Beginner
Products: NA

Getting Started
For this how-to example, we are going to be reviewing how to use the nr1 CLI's create commands to generate artifacts for your New Relic applications. In general, there are instances when you'd need to use the CLI to create an artifact, and we will be covering each of those instances.

To follow along with the examples in the how-to, we will clone the example applications from our how-to GitHub repo: https://github.com/newrelic/nr1-how-to

After cloning the nr1-how-to repo, remember to update the UUID before running the examples locally.

In your terminal, update your how-to UUID command with the command prompt below and change in the /use-nr1-create directory.

cd /nr1-howto/use-nr1-create
nr1 nerdpack:uuid
npm install
Using nr1 to create a new package

When getting started creating a new application in New Relic, the first is getting a new package created that will contain all of your application artifacts. In most cases, that package will include Nerdlets and accompanying launchers.

In your terminal, run the following command.

nr1 create

[TERMINAL IMAGE]

A prompt to select the type of artifact to generate will be displayed and start by selecting 'nerdpack.' Next, you will want to name the new Nerdpack, and we will be calling the package 'nested-nerdpack.'

Looking in the directory of the 'use-nr1-create' package, you should now see a new directory called 'nested-nerdpack' containing a brand new package including a launchers and nerdlets directory.

When getting started creating a new application in New Relic One, creating a nerdpack using 'nr1 create' is going to be the perfect way to generate a complete package that includes a launcher, nerdlet, and stylesheet all ready for development.

But, creating a new package isn't the only way you're going to want to utilize nr1 create while developing applications on New Relic.
Adding a Nerdlet to an application

At times when developing an application, you will need to create a new Nerdlet in your existing Nerdpack package.

As an example, let's start a local server and take a look at our 'Use nr1 create' app.  You can start your local server by running 'nr1 nerdpack:serve'

If you take a look at the homepage of New Relic One, you'll see the launcher for how to use nr1 create.

[LAUNCHER IMAGE]

Clicking on the 'use nr1 create' launcher, you will get a 404 error page telling you that linked Nerdlet is not found.
[404 IMAGE]

We're getting this 404 error because the 'nr1 create' app was clone without a Nerdlet. We have a perfect situation for creating a Nerdlet using the nr1 CLI.

In your terminal, run the following command, `nr1 create` and when you see the prompt to select a component type, select `nerdlet.`  Name the generated Nerdlet, 'use-nr1-create', to ensure it has the same rootNeedletId provided in the launcher's nr1.json file.

If you go back to the New Relic One homepage and select the 'How to' launcher, you should now see your new Nerdlet.

[HOW TO NERDLET IMAGE]
Adding a launcher to an application

The last artifact that we will create using nr1 create will be a launcher.  Being able to launch into an application is going to be the starting for lots of users accessing your New Relic app.

In your terminal, run the `nr1 create` command and select 'launcher' when prompted to choose a component type and name the launcher, 'empty-launcher.' The CLI will generate a new launcher in the ./nr1-howto/launchers/empty-state directory.

When creating a new launcher, you will need to connect your launcher to a Nerdlet manually.  Navigate to into the ./nr1-howto/launchers/empty-state directory and open the 'nr1.json' file. In the config object, we want to update the 'rootNerdletId,' passing it the id of the empty state Nerdlet.

[NR1 JSON IMAGE]

Update your config object to match below:

```
{
 "schemaType": "LAUNCHER",
 "id": "empty-launcher",
 "description": "Describe me",
 "displayName": "Empty Launcher",
 "rootNerdletId": "empty-state"
}
```
If you go back to the New Relic One homepage and select the 'Empty Launcher' you should be taken into the empty-state Nerdlet and have successfully created a new launcher.

[EMPTY NERDLET IMAGE]
