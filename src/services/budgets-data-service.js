import config from '../config/config';
import Api from '../helpers/api';

export default class BudgetsDataService {
  static getList() {
    var request_url = config.server_url + '/budgets'

    return Api.fetch(request_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AppState.currentUser.auth_token
      }
    })
  }

  static getExpenses(budgetID) {
    var request_url = config.server_url + '/budgets/' + budgetID + '/budget_transactions'

    return Api.fetch(request_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AppState.currentUser.auth_token
      }
    })
  }

  static createExpense(budgetID, expense) {
    var request_url = config.server_url + '/budgets/' + budgetID + '/budget_transactions'

    var body = new FormData()

    for (var key in expense) {
      if (expense.hasOwnProperty(key)) {
        body.append(key, expense[key])
      }
    }

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
