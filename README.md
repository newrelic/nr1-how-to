[![Example Code header](https://github.com/newrelic/open-source-office/raw/master/examples/categories/images/Example_Code.png)](https://github.com/newrelic/open-source-office/blob/master/examples/categories/index.md#example-code)


# How To: Build New Relic One Application Examples
Welcome to the nr1-how-to repo. Each directory in the repo is connected to a different how-to example explaining various aspects of the building New Relic Applications.

When in a directory, each application provides you with the starting code to following along with the how-to.

In your text editor, you want to update the line below to include your account id in the nerdlet's `index.js` file.

```js
this.accountId = <REPLACE ME WITH YOUR ACCOUNT ID>;
```

__Note:__ _Your account id is viewable in the profile selection menu of the developer center, where you downloaded in the nr1 CLI._

Before running the example code, you will need to update the UUID and serve then application.

```bash
nr1 nerdpack:uuid -gf
nr1 nerdpack:serve
```

After serving the application, on the New Relic One homepage, you will see a new launcher similar to below that will launch the start if the example code.

![How to launcher image](https://github.com/newrelic/nr1-how-to/blob/master/add-time-picker/screenshots/homepage-launcher.png)

The final code for each example lives in the `final.js` file is the nerdlet's directory.

# Have a recommendation for an how to example?

Create a new issue on this repo! :)