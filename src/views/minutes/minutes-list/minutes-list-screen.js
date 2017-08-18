import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import MinutesDataService from '../../../services/minutes-data-service';
import MinutesListView from './minutes-list-view';

export default class MinutesListScreen extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarButtonColor: '#FFFFFF',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 20,
    navBarBackgroundColor: '#f47a4b',
    navBarTextFontFamily: 'Open Sans',
  }

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../../../../img/icons/home.png'),
        id: 'minutes_list_home',
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: true,
      refreshing: false,
      minutesList: [],
      groupedMinutesList: []
    }
  }

  componentDidMount() {
    this._getMinutes()

    AppEventBus.off('minutes_created')
    AppEventBus.on('minutes_created', (minutes) => {
      var minutesList = this.state.minutesList.slice(0)
      minutesList.unshift(minutes)

      var groupedMinutesList = _.groupBy(minutesList, (minutesItem) => {
        var time = moment(minutesItem.occurred_at)
        return time.startOf('week').format("MM/DD/YYYY")
      })

      this.setState({
        minutesList,
        groupedMinutesList
      })
    })
  }

  _refreshMinutes() {
    this.setState({
      refreshing: true
    })

    this._getMinutes()
  }

  _getMinutes() {
    MinutesDataService.getAllMinutes().then((minutesListJSON) => {

      var groupedMinutes = _.groupBy(minutesListJSON, (minutesItem) => {
        var time = moment(minutesItem.occurred_at)
        return time.startOf('week').format("MM/DD/YYYY")
      })

      this.setState({
        loading: false,
        refreshing: false,
        minutesList: minutesListJSON,
        groupedMinutesList: groupedMinutes,
      })
    }).catch((error) => {
      this.setState({
        loading: false,
        refreshing: false
      })
    })
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'minutes_list_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen() {
    this.props.navigator.pop()
  }

  _navigateToMinutesShowScreen = (minutes) => {
    this.props.navigator.push({
      screen: 'MinutesShowScreen',
      passProps: {
        minutes
      }
    })
  }

  _navigateToMinutesCreate = () => {
    this.props.navigator.push({
      screen: 'MinutesCreateScreen'
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
        <MinutesListView
          style={{flex: 1}}
          minutesList={this.state.groupedMinutesList}
          onItemPress={this._navigateToMinutesShowScreen}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._refreshMinutes.bind(this)}
            />
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={this._navigateToMinutesCreate}>
          <Image source={require('../../../../img/icons/add.png')}/>
        </TouchableOpacity>
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
