import React from 'react';

/*
  props:
    app
    chartId
    qlikId
*/
export default class QlikObject extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.app.getObject(this.props.chartId, this.props.qlikId).then(model => this.setState({ model: model }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.qlikId !== nextProps.qlikId;
  }

  componentDidUpdate() {
    if (this.state.model) {
      this.state.model.close();
    }
    this.props.app.getObject(this.props.chartId, this.props.qlikId).then(model => this.setState({ model: model }));
  }

  componentWillUnmount() {
    if (this.state.model) {
      this.state.model.close();
    }
  }

  render() {
    return <div style={{ height: 300, width: 700 }} id={this.props.chartId} />;
  }
}