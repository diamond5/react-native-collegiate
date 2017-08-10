import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
  PixelRatio,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import EventListView from './event-list-view';
import EventDataService from '../../../services/event-data-service';

export default class EventListScreen extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarButtonColor: '#FFFFFF',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 20,
    navBarBackgroundColor: '#0ebcd8',
    navBarTextFontFamily: 'Open Sans',
  }

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../../../../img/icons/home.png'),
        id: 'event_list_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: true,
      refreshing: false,
      events: []
    }
  }

  componentDidMount() {
    this._getEvents()

    AppEventBus.off('event_updated')

    AppEventBus.on('event_updated', (event) => {
      var events = _.map(this.state.events, (eventItem) => eventItem.id == event.id ? event : eventItem)

      this.setState({
        events
      })
    })
  }

  componentWillUnmount() {
    AppEventBus.off('event_updated')
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'event_list_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen() {
    this.props.navigator.pop()
  }

  _navigateToEventShowScreen = (event) => {
    this.props.navigator.push({
      screen: 'EventShowScreen',
      title: 'Check-in',
      passProps: {
        event
      }
    })
  }

  _refreshEvents = () => {
    this.setState({
      refreshing: true
    })

    this._getEvents()
  }

  _getEvents = () => {
    EventDataService.getList().then((events) => {
      this.setState({
        events,
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>EVENTS</Text>
        </View>
        <EventListView
          style={{flex: 1}}
          events={this.state.events}
          onItemPress={this._navigateToEventShowScreen}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._refreshEvents.bind(this)}
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
  },
  header: {
    height: 30,
    backgroundColor: '#e2e4e5',
    justifyContent: 'center',
    paddingLeft: 6
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.7)'
  }
});
