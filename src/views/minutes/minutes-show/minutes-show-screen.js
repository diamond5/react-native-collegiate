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
import Icon from 'react-native-vector-icons/EvilIcons';

export default class MinutesShowScreen extends Component {
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
        id: 'minutes_list_show',
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: true
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'minutes_list_show') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
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
          <TouchableOpacity style={styles.backButton} onPress={this._navigateToPreviousScreen}>
            <Image source={require('../../../../img/icons/back.png')} />
            <Text style={styles.headerTitle}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.minutesTitle}>{this.props.minutes.name}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.notes}>{this.props.minutes.notes}</Text>
          </View>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  header: {
    height: 30,
    backgroundColor: '#e2e4e5',
    justifyContent: 'center',
    paddingLeft: 6
  },
  backButton: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  contentContainer: {
    flex: 1,
    padding: 10
  },
  minutesTitle: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.8)'
  },
  textContainer: {
    marginTop: 6,
    flex: 1,
    paddingHorizontal: 10
  },
  notes: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.8)'
  }
});
