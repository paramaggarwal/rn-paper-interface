import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

let App = require('./app')

class RNPaperInterface extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('RNPaperInterface', () => RNPaperInterface);
