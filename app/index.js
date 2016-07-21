import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  LayoutAnimation
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient'
let AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

let Card = require('./feed/Card');
let cards = require('./feed/mocks');
let panDiff = 240;

class App extends Component {
  constructor(props) {
    super(props)

    let pan = new Animated.ValueXY()
    this.state = {
      isDocked: true,
      scroll: true,
      pan: pan,
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
      onPanResponderGrant: () => {
        // this.setState({scroll: false})
      },
      onPanResponderMove: Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}]),
      onPanResponderRelease: () => {
        // this.setState({scroll: true})

        if (Math.abs(this._pan.y) < panDiff / 3) {
          // return
          Animated.spring(this.state.pan.y, {
            toValue: this.state.isDocked ? 0 : 0
          }).start();
        } else {
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

  componentDidMount() {
    this.state.pan.addListener((value) => {
      // console.log(value)
      this._pan = value
    });
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();  
    this.state.pan.y.removeAllListeners();
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
        <AnimatedScrollView
          horizontal={true}
          pagingEnabled={!this.state.isDocked}
          scrollEnabled={this.state.scroll}
          directionalLockEnabled={true}
          style={this.getListViewStyle()}
          {...this._panResponder.panHandlers}
        >
          {cards.map((c, i) => <Card key={i} data={c} />)}
        </AnimatedScrollView>
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
