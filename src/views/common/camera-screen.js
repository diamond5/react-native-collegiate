import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';


import _ from 'lodash';

const BUTTON_TYPE_CANCEL = 'left';
const BUTTON_TYPE_DONE = 'right';
const BUTTON_TYPE_CAMERA = 'capture';

import { CameraKitCamera } from 'react-native-camera-kit';

export default class CameraScreen extends Component {
  _onCapturePress = () => {
    this.camera.capture(false).then((image) => {
      this.props.onImageCapture(image)
    })
  }

  _onCancelPress = () => {
    this.props.onImageCapture()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CameraKitCamera
          ref={(cam) => this.camera = cam}
          style={{flex: 1, justifyContent: 'flex-end'}}
          flashMode={'off'}
          />

        <View style={styles.bottomButtons}>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
             style={[styles.bottomButton, { justifyContent: 'flex-start'}]}
             onPress={this._onCancelPress}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={this._onCapturePress}
            >
              <Image
                style={styles.captureButton}
                source={require('../../../img/icons/camera.png')}
                resizeMode={'contain'}
              >
              </Image>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}></View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 20
  },
  ratioBestText: {
    color: 'white',
    fontSize: 18,
  },
  ratioText: {
    color: '#ffc233',
    fontSize: 18
  },
  topButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 0
  },
  cameraContainer: {
    flex: 10,
    flexDirection: 'column'
  },
  captureButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomButtons: {
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14
  }
});
