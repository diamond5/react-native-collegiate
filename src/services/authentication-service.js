import config from '../config/config';
import Api from '../helpers/api';

export default class AuthenticationService {
  static signIn(email, password) {
    var request_url = config.server_url + '/login'

    return Api.fetch(request_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-EMAIL': email,
        'X-API-PASS': password
      }
    })
  }

  static forgotPassword(email) {
    var request_url = config.server_url + '/reset_password'
    var body = new FormData()

    body.append('email', email)

    return Api.fetch(request_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: body
    })
  }
}
