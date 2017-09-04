import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import AuthenticationService from '../../../services/authentication-service';

export default class ForgotPasswordScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '8b47651e@example.com',
      loading: false
    }
  }

  _requestForgotPassword = () => {
    this.setState({
      loading: true
    })

    var email = this.state.email.trim()
    AuthenticationService.forgotPassword(email).then(responseJSON => {
      this.setState({
        loading: false
      })

      Alert.alert('Thanks', 'An email is on the way. Check your inbox for a link to reset your password');
    }).catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _renderActivityIndicator() {
    return (
      <ActivityIndicator
        animating={true}
        style={styles.activityIndicator}
        size={'large'}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.topThird}>
        </View>
        <View
          style={styles.middleThird}>
          <Image
            style={styles.textFieldIcon}
            resizeMode="contain"
            source={require('../../../../img/logo.png')}/>
          <View style={{height: 30}}></View>
          <Text style={styles.instructionText}>
            Please enter your email used to login below. We will send you a link to reset your password shortly! Thanks for your patience
          </Text>
          <View style={{height: 30}}></View>
          <View
            style={styles.formContainer}>
            <View
              style={styles.textFieldContainer}>
              <View
                style={styles.textFieldIconContainer}>
                <Image
                  style={styles.textFieldIcon}
                  resizeMode="contain"
                  source={require('../../../../img/icons/username.png')}/>
              </View>
              <TextInput
                onChangeText={email => this.setState({email})}
                value={this.state.email}
                underlineColorAndroid={"transparent"}
                style={styles.textField}/>
            </View>
            <Button
              onPress={this._requestForgotPassword}
              buttonStyle={styles.submitButton}
              borderRadius={9}
              backgroundColor='#fd7f55'
              title='Send Email' />

          </View>
        </View>
        <View
          style={styles.bottomThird}>
          <View
            style={{flex: 1}}></View>
          <TouchableOpacity onPress={this._navigateToPreviousScreen}>
            <Text
              style={styles.bottomButtonText}>
              back to login
            </Text>
          </TouchableOpacity>
          {/* <Text
            style={styles.forgotPasswordDescriptionText}>
            By logging in, you agree to the terms and conditions.
          </Text> */}
        </View>
        { this.state.loading ? this._renderActivityIndicator() : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#daf5f9',
  },
  topThird: {
    flex: 1
  },
  middleThird: {
    alignItems: 'center'
  },
  bottomThird: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 35
  },
  instructionText: {
    fontSize: 15,
    fontWeight: '200',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.7)',
    marginHorizontal: 20
  },
  formContainer: {
    marginLeft: 45,
    marginRight: 45,

    alignItems: 'center'
  },
  textFieldContainer: {
    flexDirection: 'row',
    borderRadius: 9,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF'
  },
  textFieldIconContainer: {
    width: 35,
    backgroundColor: '#14bed9',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9
  },
  textFieldIcon: {

  },
  textField: {
    flex: 1,
    height: 35,
    backgroundColor: '#FFFFFF',
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 9,
    paddingTop: 0,
    paddingBottom: 0
  },
  submitButton: {
    width: 150,
    marginTop: 20
  },
  forgotPassword: {

  },
  bottomButtonText: {
    fontSize: 15,
    fontWeight: '200',
    fontFamily: 'Open Sans'
  },
  forgotPasswordDescriptionText: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: '200'
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});
