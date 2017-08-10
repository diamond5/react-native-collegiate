import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BudgetsDataService from '../../../services/budgets-data-service';
import ExpenseListView from './expense-list-view';
import OfficerBudgetListView from './officer-budget-list-view';
import _ from 'lodash';

export default class TaskListScreen extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarButtonColor: '#FFFFFF',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 20,
    navBarBackgroundColor: '#3bb878',
    navBarTextFontFamily: 'Open Sans',
  }

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../../../../img/icons/home.png'),
        id: 'expense_list_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      expenses: [],
      loading: true,
      refreshing: false,
      tabSelected: 0
    }
  }

  componentDidMount() {
    this._getExpenses()
    AppEventBus.off('expense_created')
    AppEventBus.on('expense_created', (expense) => {
      var expenses = this.state.expenses.slice(0)
      expenses.unshift(expense)

      this.setState({
        expenses
      })
    })
  }

  componentWillUnmount() {
    AppEventBus.off('expense_created')
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'expense_list_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _refreshExpenses() {
    this.setState({
      refreshing: true
    })

    this._getExpenses()
  }

  _getExpenses() {
    BudgetsDataService.getExpenses(this.props.budget.id).then(expenses => {
      this.setState({
        expenses,
        loading: false,
        refreshing: false
      })
    }).catch(error => {
      this.setState({
        loading: false,
        refreshing: false
      })
    })
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _navigateToExpenseShowScreen = (expense) => {
    this.props.navigator.push({
      screen: 'ExpenseShowScreen',
      title: 'Expenses',
      passProps: {
        expense
      }
    })
  }

  _navigateToCreateExpense = () => {
    this.props.navigator.push({
      screen: 'ExpenseCreateScreen',
      title: 'Expenses',
      passProps: {
        budget: this.props.budget
      }
    })
  }

  _tabSelected = (tabIndex) => {
    this.setState({
      tabSelected: tabIndex
    })
  }

  _renderMyReceipts() {
    var expenses = _.filter(this.state.expenses, (expense) => {
      return expense.created_by_user_id == AppState.currentUser.id
    })

    return (
      <View style={{flex: 1}}>
        <ExpenseListView
          style={{flex: 1}}
          expenses={expenses}
          onItemPress={this._navigateToExpenseShowScreen}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._refreshExpenses.bind(this)}
            />
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={this._navigateToCreateExpense}>
          <Image source={require('../../../../img/icons/add.png')}/>
        </TouchableOpacity>
      </View>
    )
  }

  _renderOfficerBudget() {
    var expenses = this.state.expenses

    return (
      <OfficerBudgetListView
        style={{flex: 1}}
        budget={this.props.budget}
        expenses={expenses}
        onItemPress={this._navigateToExpenseShowScreen}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._refreshExpenses.bind(this)}
          />
        }
      />
    )
  }

  _renderActivityIndicator() {
    return (
      <ActivityIndicator
        size={'large'}
        style={styles.activityIndicator}
        animating={true}/>
    )
  }

  render() {
    var selectedTab

    if (this.state.tabSelected == 0) {
      selectedTab = this._renderMyReceipts()
    }
    else if (this.state.tabSelected == 1) {
      selectedTab = this._renderOfficerBudget()
    }

    return (
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={this._navigateToPreviousScreen}>
            <Image source={require('../../../../img/icons/back.png')} />
            <Text style={styles.headerTitle}>Back</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.tabBar}>
          <TouchableWithoutFeedback style={{flex: 1}} onPress={() => this._tabSelected(0)}>
            <View style={{flex: 1}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.tabText}>My Receipts</Text>
              </View>
              {this.state.tabSelected == 0 ? <View style={{height: 4, backgroundColor: '#fec437'}}></View> : null}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={{flex: 1}} onPress={() => this._tabSelected(1)}>
            <View style={{flex: 1}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.tabText}>Officer Budget</Text>
              </View>
              {this.state.tabSelected == 1 ? <View style={{height: 4, backgroundColor: '#fec437'}}></View> : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
        {selectedTab}
        { this.state.loading ? this._renderActivityIndicator() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  header: {
    height: 30,
    backgroundColor: '#e2e4e5',
    justifyContent: 'flex-start',
    paddingLeft: 6,
    flexDirection: 'row',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  tabBar: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#bde7d2'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Open Sans',
    color: 'rgba(0, 0, 0, 0.7)',
    textAlign: 'center'
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffce46',
    position: 'absolute',
    bottom: 40,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
