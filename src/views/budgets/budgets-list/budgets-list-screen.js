import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BudgetsDataService from '../../../services/budgets-data-service';
import BudgetsListView from './budgets-list-view';
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
        id: 'budgets_list_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      budgetsList: [],
      loading: true,
      refreshing: false
    }
  }

  componentDidMount() {
    this._getBudgets()
  }

  componentWillUnmount() {
    AppEventBus.off('task_created')
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'budgets_list_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _refreshBudgets() {
    this.setState({
      refreshing: true
    })

    this._getBudgets()
  }

  _getBudgets() {
    BudgetsDataService.getList().then(budgetsList => {
      this.setState({
        budgetsList,
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

  _navigateToExpensesListScreen = (budget) => {
    this.props.navigator.push({
      screen: 'ExpenseListScreen',
      title: 'Expenses',
      passProps: {
        budget: budget
      }
    })
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
    return (
      <View style={styles.container}>
        <BudgetsListView
          style={{flex: 1}}
          budgetsList={this.state.budgetsList}
          onItemPress={this._navigateToExpensesListScreen}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._refreshBudgets.bind(this)}
            />
          }
        />
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
  }
});
