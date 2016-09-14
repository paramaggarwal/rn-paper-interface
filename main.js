import Exponent from 'exponent';
import React, { Component } from 'react';

let App = require('./app')

class RNPaperInterface extends Component {
  render() {
    return (
      <App />
    );
  }
}

Exponent.registerRootComponent(RNPaperInterface);
