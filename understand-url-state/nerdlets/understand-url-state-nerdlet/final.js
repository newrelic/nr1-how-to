import React from 'react';
import { PlatformStateContext, NerdletStateContext, navigation, nerdlet, BlockText, Button } from 'nr1';

export default class UnderstandUrlStateNerdletNerdlet extends React.Component {
    constructor(props){
        super(props)
        this.accountId =  1606862
    }

    render() {
        const nerdlet = {
            id: 'transactions',
            urlState: {
                facet: 'appName',
                accountId: this.accountId,
            },
        };
        const location = navigation.getOpenNerdletLocation(nerdlet);

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
}
