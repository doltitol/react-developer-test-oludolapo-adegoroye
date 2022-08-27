import React, { PureComponent } from 'react';

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>{this.props.category}</div>;
  }
}

export default Home;
