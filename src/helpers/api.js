import { Navigation } from 'react-native-navigation';
import _ from 'lodash';

export default class Api {
  static fetch(request_url, options) {
    return fetch(request_url, options).then(resp => {
      let json = resp.json();

      if (resp.ok)
        return json

      return json.then(err => {throw err});
    }).catch(error => {
      var messageText = ''

      if (error.errors && error.errors instanceof Array) {
        _.each(error.errors, (message) => messageText += message)
      }
      else if (error.errors && error.errors instanceof Object) {
        _.each(error.errors, (messages, key) => {
          _.each(messages, (message) => messageText += key + ' ' + message)
        })
      }
      else if (error.errors && typeof error.errors == "string") {
        messageText = error.errors
      }
      else if (error.error && typeof error.error == "string") {
        messageText = error.error
      }
      else
        messageText = JSON.stringify(error)

      Navigation.showInAppNotification({
        screen: "ErrorView",
        passProps: {
          errorMessage: messageText
        }
      })
      
      throw error
    })
  }
}
