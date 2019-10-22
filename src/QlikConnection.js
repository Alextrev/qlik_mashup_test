import React from 'react';

/*
  props:
    appName
    callback
*/
export default class QlikConnection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.openQlikConnection();
  }

  openQlikConnection = () => {
    const require = window.require;
    const config = {
      host: 'qlik-amenity.amenityanalytics.com',
      isSecure: true,
      port: 443,
      prefix: '/viewer/',
    };
    require.config({
      baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
    });

    require(['js/qlik'], (qlik) => {
      qlik.setOnError((error) => {
        this.props.callback({ errorMessage: `Error upon loading QVF from Qlik ${error}`, app: null });
        console.error('Require error, ', error);
      });
      //open apps — inserted here —
      const app = qlik.openApp('d86b6499-c197-4760-b05c-4992e60cbc25', config);
      const state = { errorMessage: null };
      state[this.props.appName] = app;
      this.props.callback(state);
    });
  }

  render() {
    return <span />;
  }
}