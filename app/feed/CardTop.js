import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

class CardTop extends Component {
  render() {
    let {
      userPicture,
      userName,
      lightColor,
      darkColor,
      badgeText
    } = this.props

    return (
      <View style={{
        flexDirection: 'row'
      }}>
        <Image 
          style={styles.profilePicture}
          source={{
            height: 80,
            width: 80,
            uri: userPicture
          }}
        />
        
        <Text style={styles.displayName}>
          {userName}
        </Text>

        <View
          style={styles.badgeSection}
        >
          <View
            style={[styles.badgeSlug, {
              backgroundColor: lightColor
            }]}
          >
            <Text style={[styles.badgeText,{
              color: darkColor
            }]}>
              {badgeText}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    margin: 20,
    marginRight: 10
  },
  displayName: {
    backgroundColor: 'transparent',
    color: 'white',
    marginLeft: 0,
    marginTop: 22,
    fontSize: 20,
    marginBottom: 5,
  },
  badgeSection: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20,
    justifyContent: 'center'
  },
  badgeSlug: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  badgeText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold'
  },
});

module.exports = CardTop;
