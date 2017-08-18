'use strict'

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text
} from 'react-native';

export default class CircularButtonWithIcon extends Component {
  render() {
    return (
      <View style={[this.props.style, styles.buttonContainer]}>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <View style={[styles.buttonCircle, {backgroundColor: this.props.buttonColor}]}>
            <Image style={styles.buttonIcon}
              resizeMode="contain"
              source={this.props.icon}/>
          </View>
          <Text style={styles.buttonText}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonCircle: {
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonIcon: {
    width: 30,
    height: 30
  },
  buttonText: {
    marginTop: 3,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '100',
    fontFamily: 'Open Sans'
  },
})
