import React from 'react';
import { UserStorageQuery, UserStorageMutation, Toast, Grid, GridItem, Spinner, TextField, Button, Modal, Table, TableHeader, TableHeaderCell, TableRow, TableRowCell } from 'nr1';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class UseNerdstorageNerdletNerdlet extends React.Component {
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

    _renderStorage(){
        const { storage } = this.state;
        console.log('render', storage)

        if(Array.isArray(storage) && storage.length == 0){
            return <div className="empty-message">You have no data stored in your NerdStorage profile. How do you suggest we solve this?</div>
        }

        return (
            <table className="nerdstorage-table">
                <thead>
                    <tr>
                        <th className="narrow-col">Index</th>
                        <th colSpan="2">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {storage.map((data, index) => (
                        <tr key={index}>
                            <td className="narrow-col">{index}</td>
                            <td>{data}</td>
                            <td className="narrow-col">
                                <Button
                                    onClick={() => this._removeFromNerdStorage(index, data)}
                                    type={Button.TYPE.DESTRUCTIVE}
                                    iconType={Button.ICON_TYPE.INTERFACE__OPERATIONS__TRASH}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

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

    _deleteDocument(){
        this.setState({storage: []});
        UserStorageMutation.mutate({
            actionType: UserStorageMutation.ACTION_TYPE.DELETE_DOCUMENT,
            collection: this.collectionId,
            documentId: this.documentId,
        });
        Toast.showToast({ title: "NerdStorage Update.", type: Toast.TYPE.CRITICAL });
    }

    render() {
        const { storage } = this.state;

        return (
            <div>
                <Button
                    class="show-btn"
                    onClick={() => this.setState({isOpen: true})}
                    type={Button.TYPE.PRIMARY}
                    iconType={Button.ICON_TYPE.DOCUMENTS__DOCUMENTS__NOTES__A_ADD}
                >
                    Welcome to NerdStorage
                </Button>

                {this.state.isOpen && (
                    <Modal
                        onClose={() => this.setState({isOpen: false, text: ''})}
                    >
                        <h1>Saved to NerdStorage</h1>
                        <p className="intro-message">
                            Use the form below to add data to your user profile in NerdStorage. You can also add data to an entity or account using similar API components. Learn more at <a href="https://developer.newrelic.com/client-side-sdk/index.html#data-fetching/UserStorageQuery">developer.newrelic.com</a>
                        </p>
                        <Grid>
                            <GridItem columnSpan={10}>
                                <TextField
                                    label='Add to NerdStorage'
                                    placeholder='What will you add to NerdStorage?'
                                    value={this.state.text}
                                    onChange={(e) => this.setState({text: e.target.value})}
                                />
                            </GridItem>
                            <GridItem columnSpan={2}>
                                <Button
                                    className="submit"
                                    onClick={() => this._addToNerdStorage()}
                                    type={Button.TYPE.PRIMARY}
                                    iconType={Button.ICON_TYPE.INTERFACE__SIGN__CHECKMARK}
                                />
                            </GridItem>
                            <GridItem columnSpan={12}>
                                {true &&
                                    this._renderStorage()
                                }
                            </GridItem>
                            <GridItem columnSpan={12}>
                                <Button
                                    onClick={() => this._deleteDocument()}
                                    type={Button.TYPE.DESTRUCTIVE}
                                    sizeType={Button.SIZE_TYPE.SMALL}
                                    iconType={Button.ICON_TYPE.INTERFACE__OPERATIONS__TRASH}
                                >
                                    Delete Document
                                </Button>
                            </GridItem>
                        </Grid>
                    </Modal>
                )}
            </div>
        );
    }
}
