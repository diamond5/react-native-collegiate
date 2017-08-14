'use strict'

import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet
} from 'react-native';

export default class LoadingScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  render() {
    return (
      <ActivityIndicator
        style={{
          flex: 1,
          backgroundColor: '#daf5f9'
        }}
        color={"#000000"}
        size='large'
        animating={true}>
      </ActivityIndicator>
    );
  }
}
