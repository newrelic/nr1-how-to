# How to use NerdStorage
Difficulty Level: Intermediate
Products: N/A

## Getting Started
In this how-to example, you will add NerdStorage to a New Relic One application teaching you how to store and configure data within your applications.

To get started, we will clone the example applications from our [how-to GitHub repo](https://github.com/newrelic/nr1-how-to).

Next, we will use the NR1 CLI to update the application UUID and run our application locally. In the terminal, let's change into the **/nr1-howto/use-nerdstorage** directory.

```bash
cd /nr1-howto/use-nerdstorage
```

Now, we want to update the UUID and serve our application.

```bash
nr1 nerdpack:uuid -gf
nr1 nerdpack:serve
```

Once our app is successfully served, in your terminal, you'll be provided with a URL to access New Relic One and see your running application.

New Relic link: [https://one.newrelic.com/?nerdpacks=local](https://one.newrelic.com/?nerdpacks=local)

Now on the New Relic homepage, you should have a new launcher to the how-to example.

![LAUNCHER IMAGE](https://github.com/newrelic/nr1-how-to/blob/master/use-nerdstorage/screenshots/launcher.png)

After launching the **'Use NerdStorage'** application, you will see the running New Relic app that should look similar to the image below:

![HOW TO SCREENSHOT](https://github.com/newrelic/nr1-how-to/blob/master/use-nerdstorage/screenshots/nerdstorage-app.png)

## What is NerdStorage?
**NerdStorage** is a document database that is accessible within the New Relic One interface.  Allowing for use and retrieval of data the next time we enter this Nerdlet

Using NerdStorage, you will be able to create documents of up to 64kb of data, different collections of documents, and store your data on an `Entity`, `Account`, or `User` level.

To find out more about **NerdStorage**, please read the docs on the [New Relic developer website](https://developer.newrelic.com/build-tools/new-relic-one-applications/nerdstorage).


## Add data to NerdStorage
Now that you have a better understanding of what is **NerdStorage**, you will be adding it to the example application currently running on your local machine.

Go to the New Relic One homepage and click the launcher for **How To Use NerdStorage**. You will find an application that looks similar to below:

![no-nerdstorage](https://github.com/newrelic/nr1-how-to/blob/master/use-nerdstorage/screenshots/no-nerdstorage.png)

Type something to add to **NerdStorage** and click the check button. Nothing happens... but why?

In the app, we want to display data saved to NerdStorage and allow the user to quickly update and delete that data. Currently, the red error message shows, there is no data stored. To add data into this application, we will store data to the user level, using the `UserStorageMutation` component in the [NR1 library](https://developer.newrelic.com/client-side-sdk/index.html#data-fetching/UserStorageMutation).

Open the application's **'./nerdlets/use-nerdstorage-nerdlet/index.js'** file in the text editor of your choice and find the code for the `TextField` and `Button` used to enter data. The `Button` `onClick` prop makes a call to a helper method called `_addToNerdStorage` This helper method needs to be updated to add the `UserStorageMutation`.


AThe UserStorage NerdStorage components require a `collection` and `documentId` to be provided. If you look at the `constructor`  in the application's index.js file, you can see the variables being provided to the components. Your constructor should be similar to below:

```js
constructor(props) {
        super(props)
        this.collectionId = 'mycollection';
        this.documentId = 'learning-nerdstorage';
        this.state = {
            isOpen: true,
            storage: [],
            text: '',
        };
        this._addToNerdStorage = this._addToNerdStorage.bind(this);
        this._removeFromNerdStorage = this._removeFromNerdStorage.bind(this);
        this._deleteDocument = this._deleteDocument.bind(this);
    }
```

Replace the current `_addToNerdStorage` method with the code below:

Import the `UserStorageMutation` by adding it to your import statement at the top of the index.js file.

```js
import {UserStorageMutation } from 'nr1';
```

then update the helper with the code below:

```js
_addToNerdStorage(){
        const { text, storage } = this.state;
        storage.push(text);
        this.setState({storage}, () => {
            UserStorageMutation.mutate({
                actionType: UserStorageMutation.ACTION_TYPE.WRITE_DOCUMENT,
                collection: this.collectionId,
                documentId: this.documentId,
                document: { storage },
            })
            .then((res) => {
                this.setState({text: ''});
                Toast.showToast({ title: "NerdStorage Update.", type: Toast.TYPE.NORMAL });
            })
            .catch((err) => console.log(err));
        });
    }
```

Now, enter text into the `TextField` and click the check button. From the code added into the `UserStorageMutation` the text inserted into the `TextField` will be stored into the application state and then saved to *NerdStorage*. After *NerdStroage* is updated, a `Toast` notification displays, and you can see your data displayed in a table similar to below.

![Data added](https://github.com/newrelic/nr1-how-to/blob/master/use-nerdstorage/screenshots/data-added.png)

## Query data from NerdStorage
After the last section, the application can now store data to **NerdStorage**, but if you were to exit the application, back to the New Relic One homepage and re-enter, you'd see that the red warning message is back.

The application isn't reading the data from **NerdStorage** and loads with an empty state. The `UserStorageQuery` component will be used to query data from **NerdStorage** and render the table when after the app mounts.

Import the `UserStorageQuery` by adding it to the import statement.

```js
import {UserStorageMutation, UserStorageQuery } from 'nr1';
```

Add the following `componentDidMount` method to your application.

```js
componentDidMount(){
        UserStorageQuery.query({
            collection: this.collectionId,
            documentId: this.documentId,
        })
        .then(({ data }) => {
            if(data !== null) {
                this.setState({storage: data.storage});
            }
        })
        .catch(err => console.log(err));
    }
```

Insert a few more entries into **NerdStorage** using the `TextField`, exit the application, and re-enter by clicking it's `launcher` on the homepage.

Your application will load, showing the data queried from NerdStorage. Your app should look similar to below:

![queried-data](https://github.com/newrelic/nr1-how-to/blob/master/use-nerdstorage/screenshots/data-query.png)

## Mutate data in  NerdStorage

Each **NerdStorage** entry displayed in the table has a trashcan button that can be used to update a specific entry. The trash `Button` is making a call to the `_removeFromNerdStorage` helper method. Update the code in the `_removeFromNerdStorage` to match the code below:

```js
_removeFromNerdStorage(index, data){
        const { storage } = this.state;
        storage.pop(data);

        this.setState({storage}, () => {
            UserStorageMutation.mutate({
                actionType: UserStorageMutation.ACTION_TYPE.WRITE_DOCUMENT,
                collection: this.collectionId,
                documentId: this.documentId,
                document: { storage },
            })
            .then((res) => {
                Toast.showToast({ title: "NerdStorage Update.", type: Toast.TYPE.NORMAL });
            })
            .catch((err) => console.log(err));
        });
    }
```

Now, if you click one of the buttons, that item will be removed, and NerdStorage will be updated to reflect that change.

## Delete collection from NerdStorage
Once the `_removeFromNerdStorage` method is added, a user can go through their list of entries and delete unwanted data. But, in large collections of data, this would be a viable option.

In the next steps, we'll add another button to the application that will allow the deletion of the entire NerdStorage document at one time.

Add a new `GridItem` to the application just before the closing `Grid` tag.  In the new `GridItem`, the following code will be added to display a new button.

```js
<Button
onClick={() => this._deleteDocument()}
type={Button.TYPE.DESTRUCTIVE}
sizeType={Button.SIZE_TYPE.SMALL}
iconType={Button.ICON_TYPE.INTERFACE__OPERATIONS__TRASH}
                                >
       Delete Document
</Button>
```

The delete document button is making a call to the `_deleteDocument`  helper method. Update the helper method with the code below.

```js
_deleteDocument(){
        this.setState({storage: []});
        UserStorageMutation.mutate({
            actionType: UserStorageMutation.ACTION_TYPE.DELETE_DOCUMENT,
            collection: this.collectionId,
            documentId: this.documentId,
        });
        Toast.showToast({ title: "NerdStorage Update.", type: Toast.TYPE.CRITICAL });
    }
```

Your application should look similar to below:

![with-delete](https://github.com/newrelic/nr1-how-to/blob/master/use-nerdstorage/screenshots/with-delete.png)

If you click the delete document button, your entire list will be permanently deleted from NerdStorage, and your application will return back to the empty message.

This deletion is triggered by using the `UserStorageMutation` component, passing it an action type of `UserStorageMutation.ACTION_TYPE.DELETE_DOCUMENT`, and the collection and document id.

## How to use NerdStorage recap
Wrapping up this how-to example, you've successfully implemented NerdStorage into a New Relic One application. By using the `UserStorageQuery` and `UserStorageMutation` components, the application stores and mutates data connect to your user. For more information on the various NerdStorage components, please visit the [New Relic developer website's API documentation](https://developer.newrelic.com/client-side-sdk/index.html#data-fetching/UserStorageMutation).

To continue your learning, take a look at our [self-paced workshop on Github](https://github.com/newrelic/nr1-workshop).