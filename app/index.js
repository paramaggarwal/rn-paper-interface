import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  Dimensions,
  TouchableHighlight,
  LayoutAnimation
} from 'react-native';

import { Components } from 'exponent';
const { LinearGradient } = Components;
let AnimatedListView = Animated.createAnimatedComponent(ListView)

let Card = require('./feed/Card');
let cards = require('./feed/mocks');
let panDiff = 240;

class App extends Component {
  constructor(props) {
    super(props)

    let pan = new Animated.ValueXY();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      isDocked: true,
      pan: pan,
      dataSource: ds.cloneWithRows(cards),
      dockAnimation: pan.y.interpolate({
        inputRange: [-panDiff, 0],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      })
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}]),
      onPanResponderRelease: (evt, gestureState) => {

        let shouldToggle = this.state.isDocked ? (gestureState.dy < (-panDiff/3)) : (gestureState.dy > (panDiff/3))
        if (!shouldToggle) {
          // return to original position
          Animated.spring(this.state.pan.y, {
            toValue: this.state.isDocked ? 0 : 0
          }).start();
        } else {
          // toggle between docked and zoomed
          Animated.spring(this.state.pan.y, {
            toValue: this.state.isDocked ? (-panDiff) : panDiff
          }).start(() => {

            this.setState({
              isDocked: !this.state.isDocked,
              dockAnimation: !this.state.isDocked ? this.state.pan.y.interpolate({
                inputRange: [-panDiff, 0],
                outputRange: [0, 1],
                extrapolate: 'clamp'
              }) : this.state.pan.y.interpolate({
                inputRange: [0, panDiff],
                outputRange: [0, 1],
                extrapolate: 'clamp'
              })
            }); 
          })         
        }
      }
    })
  }

  getListViewStyle() {
    return [
      styles.container,
      {
        // borderWidth: 1,
        // borderColor: 'red',
        width: this.state.dockAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [Dimensions.get('window').width, Dimensions.get('window').width * 2],
          // extrapolate: 'clamp'
        }),
      },
      {
        transform: [
          {
            scale: this.state.dockAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.5],
              // extrapolate: 'clamp'
            }),
          },
          {
            translateX: this.state.dockAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -(Dimensions.get('window').width)],
              // extrapolate: 'clamp'
            }),
          },
          {
            translateY: this.state.dockAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, (Dimensions.get('window').height/2)],
              // extrapolate: 'clamp'
            }),
          }
        ],
      }
    ];
  }

  render() {
    return (
      <View style={styles.box}>
        <AnimatedListView
          horizontal={true}
          pagingEnabled={!this.state.isDocked}

          style={this.getListViewStyle()}
          {...this._panResponder.panHandlers}

          dataSource={this.state.dataSource}
          renderRow={(rowData, i) => <Card key={i} data={rowData} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
  },
});

module.exports = App;
