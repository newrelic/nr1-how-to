# How To: Use nr1 create commands
__Difficulty Level:__ Beginner
__Products:__ NA

## Getting Started
For this how-to example, we are going to be reviewing how to use the nr1 CLI to create commands to generate artifacts for your New Relic applications. There are instances when you need to use the CLI to create an artifact; we will be covering how to create those various artifacts, and when you need to generate them.

To follow along with this how-to, you will need to clone the example applications from our [how-to GitHub repo:](https://github.com/newrelic/nr1-how-to)

After cloning the nr1-how-to repo, remember to update the UUID before running the examples locally.

In your terminal, update your how-to UUID command with the commands below and change into the __./use-nr1-create__ directory.

```bash
cd ./nr1-howto/use-nr1-create
nr1 nerdpack:uuid -gf
npm install
```
## Using nr1 to create a new package

 The first step is to generate a new Nerdpack to contain your application artifacts. In most cases, that package will include Nerdlets and accompanying launchers;  some applications will not always need a launcher.

In your terminal, run the following command:

`nr1 create`

![TERMINAL IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/use-nr1-create/screenshots/nr1-create.png)

A prompt to select the type of component will display. Select the __'nerdpack'__ component type. When asked to name the new Nerdpack, we will be calling the package __'nested-nerdpack.'__

Looking in the directory of __'./nr1-howto/use-nr1-create'__ package, you should now see a new directory called __'nested-nerdpack'__ containing a brand new package that includes a launcher,  Nerdlets directory, and all accompanying files.

When creating a new application in New Relic One, creating a Nerdpack using __'nr1 create'__ is going to be the perfect way to generate a complete package that includes a launcher, nerdlet, and stylesheet for development.

However, creating a new Nerdpack isn't the only way you're going to want to utilize nr1 create while developing applications on New Relic.

## Adding a Nerdlet to an application

At times when developing an application, you will need to create a new Nerdlet within your existing Nerdpack package.

As an example, let's start a local server and take a look at our 'Use nr1 create' app. You can start your local server by running `nr1 nerdpack:serve`

If you take a look at the homepage of New Relic One, you'll see the launcher for how to use nr1 create.

![LAUNCHER IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/use-nr1-create/screenshots/nr1-create-launcher.png)

Click on the __'use nr1 create'__ launcher. You should get a 404 error page telling you the linked Nerdlet was not found.

![404 IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/use-nr1-create/screenshots/404-error.png)

We're getting this 404 error because the __'nr1 create'__ app was cloned without a Nerdlet. We now have a perfect situation for creating a Nerdlet using the nr1 CLI.

In your terminal, run the following command, `nr1 create` and when you see the prompt to select a component type, select `nerdlet.` Name the generated Nerdlet, __'use-nr1-create'__, to ensure it has the same rootNerdletId provided in the launcher's nr1.json file.

If you go back to the New Relic One homepage and select the 'How to' launcher, you should now see your new Nerdlet.

![HOW TO NERDLET IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/use-nr1-create/screenshots/nerdlet.png)

## Adding a launcher to an application

The last artifact that we will create using nr1 create will be a launcher. Users who want to explore your New Relic app will need a launcher to access it.

In your terminal, run the `nr1 create` command and select __'launcher'__ when prompted to choose a component type and name the launcher, 'empty-launcher.' The CLI will generate a new launcher in the __./nr1-howto/launchers/empty-state__ directory.

When creating a new launcher, you will need to connect your launcher to a Nerdlet manually. Navigate to into the ./nr1-howto/launchers/empty-state directory and open the __'nr1.json'__ file. In the config object, we want to update the __'rootNerdletId'__, passing it the id of the empty state Nerdlet.

![NR1 JSON IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/use-nr1-create/screenshots/launcher-nr1-json.png)

Update your config object to match below:

```json
{
 "schemaType": "LAUNCHER",
 "id": "empty-launcher",
 "description": "Describe me",
 "displayName": "Empty Launcher",
 "rootNerdletId": "empty-state"
}
```
If you go back to the New Relic One homepage and select the 'Empty Launcher' you should be taken into the empty-state Nerdlet and have successfully created a new launcher.

![EMPTY NERDLET IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/use-nr1-create/screenshots/tada.png)

## You are Now Complete!

 If you have made it this far, you've successfully created a Nerdpack, Nerdlet, and Launcher using `nr1 create` in the nr1 CLI. By following this process, you will be able to rapidly develop your New Relic One applications.

To continue your learning, take a look at our [self-paced workshop on Github](https://github.com/newrelic/nr1-workshop).

