import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  AppRegistry,
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

let cardsMap = require('./types');
let CardTop = require('./CardTop');

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reactionCount: 5
    }
  }

  renderCardContents(contents) {
    let {
      type,
      user,
      card,
    } = contents

    return (
      <View style={{
        flex: 1
      }}>
        <CardTop
					userPicture={user.picture}
					userName={user.name}
					lightColor={cardsMap[type].colorLight}
					darkColor={cardsMap[type].colorDark}
					badgeText={cardsMap[type].title}
        />
        <View>
          <Text style={styles.updateText}>
            {card.text}
          </Text>
        </View>
        <View style={styles.reactionBox}>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={() => {
              LayoutAnimation.easeInEaseOut()
              this.setState({
                reactionCount: this.state.reactionCount + 1
              })
            }}
          >
            <Text style={[styles.reactionEmoji, {
              textShadowColor: cardsMap[type].colorDark
            }]}>
              👏
            </Text>
          </TouchableHighlight>
          <Text style={[styles.reactionCount, {
              color: cardsMap[type].colorDark
            }]}>
            {this.state.reactionCount}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    let {
      type
    } = this.props.data

    if (type === 'photo') {
      return (
        <Image
          source={{
            uri: this.props.data.card.image
          }}
          style={{
            flex: 1,
            width: Dimensions.get('window').width - 20,
            marginTop: 20,
            marginHorizontal: 10,
            marginBottom: 10,
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'rgba(1,1,1,0.0)']}
            style={{
              flex: 1,
            }}
          >
            {this.renderCardContents(this.props.data)}
          </LinearGradient>
        </Image>
      )
    } else {
      return (
        <LinearGradient
          colors={[cardsMap[type].colorDark, cardsMap[type].colorLight]}
          style={{
            width: Dimensions.get('window').width - 20,
            marginTop: 20,
            marginHorizontal: 10,
            marginBottom: 10,
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          {this.renderCardContents(this.props.data)}
        </LinearGradient>
      )
    }
  }

  
}

const styles = StyleSheet.create({
  updateText: {
    fontSize: 32,
    color: 'white',
    backgroundColor: 'transparent',
    margin: 20,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  reactionBox: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 40,
  },
  reactionEmoji: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 50,
    padding: 10,
    textShadowRadius: 10,
    textShadowOffset: {
      width: 5,
      heigth: 5
    },
  },
  reactionCount: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 30,
    padding: 0,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

module.exports = Card;
