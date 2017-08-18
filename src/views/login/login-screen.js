import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import AuthenticationService from '../../services/authentication-service';

export default class LoginScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '069cea18ac1b@example.com',
      password: '8b47651e',
      loading: false
    }
  }

  _logIn = () => {
    this.setState({
      loading: true
    })
    var email = this.state.email.trim()
    var password = this.state.password.trim()
    var promise = AuthenticationService.signIn(email, password)

    promise.then(responseJSON => {
      this.setState({
        loading: false
      })

      AppState.set('currentUser', responseJSON, () => {
        this.props.navigator.resetTo({
          screen: 'HomeScreen'
        })
      })
    }).catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  _navigateToForgotPasswordScreen = () => {
    this.props.navigator.push({
      screen: 'ForgotPasswordScreen'
    })
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
            source={require('../../../img/logo.png')}/>
          <View
            style={styles.formContainer}>
            <View
              style={styles.textFieldContainer}>
              <View
                style={styles.textFieldIconContainer}>
                <Image
                  style={styles.textFieldIcon}
                  resizeMode="contain"
                  source={require('../../../img/icons/username.png')}/>
              </View>
              <TextInput
                onChangeText={email => this.setState({email})}
                value={this.state.email}
                underlineColorAndroid={"transparent"}
                style={styles.textField}/>
            </View>
            <View
              style={styles.textFieldContainer}>
              <View
                style={styles.textFieldIconContainer}>
                <Image
                  style={styles.textFieldIcon}
                  resizeMode="contain"
                  source={require('../../../img/icons/password.png')}/>
              </View>
              <TextInput
                onChangeText={password => this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}
                underlineColorAndroid={"transparent"}
                style={styles.textField}/>
            </View>
            <Button
              onPress={this._logIn}
              buttonStyle={styles.loginButton}
              borderRadius={9}
              backgroundColor='#fd7f55'
              title='Login' />

          </View>
        </View>
        <View
          style={styles.bottomThird}>
          <View
            style={{flex: 1}}></View>
          <TouchableOpacity
            onPress={this._navigateToForgotPasswordScreen}
            style={styles.forgotPasswordContainer}>
            <Text
              style={styles.forgotPasswordText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <Text
            style={styles.forgotPasswordDescriptionText}>
            By logging in, you agree to the terms and conditions.
          </Text>
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
  formContainer: {
    marginLeft: 45,
    marginRight: 45,
    marginTop: 20,
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
  loginButton: {
    width: 150,
    marginTop: 20
  },
  forgotPassword: {

  },
  forgotPasswordText: {
    fontSize: 15,
    fontWeight: '200'
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
