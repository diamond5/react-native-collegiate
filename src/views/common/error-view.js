'use strict'

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');
import _ from 'lodash';

export default class ErrorView extends Component {
  render() {
    var messageText = this.props.errorMessage

    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{messageText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: 'red',
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF'
  }
});
