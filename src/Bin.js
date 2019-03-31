import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class Bin extends Component {
    constructor() {
    super();
    this.state = {
      numInside: 0
    };
  }
  render() {
    return (
    <div>
        {this.state.numInside}
    </div>
    );
  }
}

export default Bin;
