import config from '../config/config';
import Api from '../helpers/api';

export default class ChannelDataService {
  static getList() {
    var request_url = config.server_url + '/channels'

    return Api.fetch(request_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AppState.currentUser.auth_token
      }
    })
  }

  static getChannelMessages(channelID) {
    var request_url = config.server_url + '/channels/' + channelID + '/messages'

    return Api.fetch(request_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AppState.currentUser.auth_token
      }
    })
  }

  static sendMessage(channelID, message) {
    var request_url = config.server_url + '/channels/' + channelID + '/messages'
    var body = new FormData()

    body.append('message', message)

    return Api.fetch(request_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': AppState.currentUser.auth_token
      },
      body: body
    })
  }
}
