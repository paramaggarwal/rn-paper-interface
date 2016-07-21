import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

let App = require('./app')

class Shroom extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Shroom', () => Shroom);
