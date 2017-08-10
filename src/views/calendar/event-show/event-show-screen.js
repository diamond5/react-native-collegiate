import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import EventDataService from '../../../services/event-data-service';

export default class EventShowScreen extends Component {
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
        id: 'event_show_screen_home',
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: false,
      event: this.props.event
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'event_show_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _checkIn = () => {
    let event = this.props.event
    this.setState({
      loading: true
    })

    navigator.geolocation.getCurrentPosition((response) => {
      let location = {
        location_long: response.coords.longitude,
        location_lat: response.coords.latitude
      }

      EventDataService.checkInEvent(event.id, location).then((responseEvent) => {
        AppEventBus.trigger('event_updated', responseEvent)
        this.setState({
          loading: false,
          event: responseEvent
        })

      }).catch(error => {
        this.setState({
          loading: false
        })
      })
    }, (error) => {
      Alert.alert('Permission Required', 'Application requires location permission for check in. Please enable it from application settings of your device.')
    })


  }

  _renderCheckInView() {
    let event = this.state.event

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={this._navigateToPreviousScreen}>
            <Image source={require('../../../../img/icons/back.png')} />
            <Text style={styles.headerTitle}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 1}}></View>
          <Text style={styles.textTop}>Today's Events: </Text>
          <View style={{flex: 1}}></View>
          <Text style={styles.titleText}>{event.name}</Text>
          <Text style={styles.venueNameText}>{event.venue_name}</Text>
          <Text style={styles.venueText}>{event.venue_address + ', ' + event.venue_city + ', ' + event.venue_state + ' ' + event.venue_zipcode}</Text>
          <View style={{flex: 1.2}}></View>
          <Text style={styles.venueTimeText}>{moment(event.occurs_at).format('MM/DD/YY | h:mm a')}</Text>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={this._checkIn}>
            <Image source={require('../../../../img/icons/checkin.png')} style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{
                  width: 80,
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'Open Sans',
                  fontWeight: '400',
                  color: 'rgba(0, 0, 0, 0.6)'
                }}>Click to check-in</Text>
            </Image>
          </TouchableOpacity>
        </View>

        { this.state.loading ? this._renderActivityIndicator() : null}
      </View>
    )
  }

  _renderCheckedInView() {
    let event = this.state.event

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={this._navigateToPreviousScreen}>
            <Image source={require('../../../../img/icons/back.png')} />
            <Text style={styles.headerTitle}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 1}}></View>
          <Text style={styles.textTop}>You are checked in to {event.name}</Text>
          <View style={{flex: 1.2}}></View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../../../../img/icons/checkedin.png')} style={{alignItems: 'center', justifyContent: 'center'}}>
          </Image>
        </View>

        { this.state.loading ? this._renderActivityIndicator() : null}
      </View>
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
    let event = this.state.event
    let view = event.checked_in_at ? this._renderCheckedInView() : this._renderCheckInView()

    return view;
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
    flexDirection: 'row'
  },
  headerTitle: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center'
  },
  textTop: {
    fontSize: 20,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  titleText: {
    lineHeight: 20,
    fontSize: 20,
    fontFamily: 'Open Sans',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  venueNameText: {
    fontSize: 18,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  venueText: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '200',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  venueTimeText: {
    fontSize: 18,
    fontFamily: 'Open Sans',
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  imageContainer: {
    flex: 1.5,
    alignItems: 'center'
  }
});
