import React from 'react';
import { EmptyState } from '@newrelic/nr1-community';


// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class EmptyStateNerdlet extends React.Component {
    render () {
        return (
        <EmptyState
            heading="Tada, you've created your launcher"
            description="This is the end of the 'how to use nr1 create' examples, and now you are an artifact creating wizard. Click the button to continue your learning on building New Relic applications."
            buttonText="Continue learning"
            buttonOnClick={() => {
                top.location="https://github.com/newrelic/nr1-workshop"
            }}
        />
        )
      }
}
