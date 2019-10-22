import React from 'react';

import QlikConnection from './QlikConnection';
import QlikObject from './QlikObject';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onMessage(state) {
    this.setState(state);
  }

  render() {
    let content = undefined;
    if (this.state.app) {
      content = (
        <div>
          <QlikObject qlikId='RRGCjQu' chartId='RRGCjQu' app={this.state.app} />
        </div>
      );
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        {content}
        <QlikConnection callback={this.onMessage.bind(this)} appName='app' />
      </div>)
  }
}