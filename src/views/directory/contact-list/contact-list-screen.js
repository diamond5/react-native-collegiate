import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import UserDataService from '../../../services/user-data-service';
import ContactListView from './contact-list-view';


export default class ContactListScreen extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarButtonColor: '#FFFFFF',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 20,
    navBarBackgroundColor: '#ffce46',
    navBarTextFontFamily: 'Open Sans',
  }

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../../../../img/icons/home.png'),
        id: 'contact_list_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: false,
      users: []
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    })

    this._getUsers()
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'contact_list_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen() {
    this.props.navigator.pop()
  }

  _navigateToContactShowScreen = (user) => {
    this.props.navigator.push({
      screen: 'ContactShowScreen',
      title: 'Profile',
      passProps: {
        user
      }
    })
  }

  _getUsers = () => {
    UserDataService.getList().then((usersJSON) => {
      let users = _.groupBy(usersJSON, (user) => user.first_name.substring(0, 1))

      this.setState({
        users,
        loading: false
      })
    }).catch(error => {
      this.setState({
        loading: false
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

  renderRow = (item, sectionId, index) => {
    return (
      <TouchableHighlight
        style={{
          height: 40,
          justifyContent: 'center',
          alignItems: 'center'}}
      >
        <Text>{item.name}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    var user = AppState.currentUser

    return (
      <View style={styles.container}>
        <View style={styles.myInfoContainer}>
          <View style={styles.column}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: user.image}} />
            </View>
          </View>
          <View style={[styles.column, {flex: 1, marginLeft: 8}]}>
            <Text style={styles.myInfoText}>{user.first_name + ' ' + user.last_name}</Text>
          </View>
          <TouchableOpacity onPress={this._navigateToMyInfoShowScreen}
            style={styles.column}>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} resizeMode="contain" source={require('../../../../img/icons/my-info.png')} />
            </View>
            <Text style={styles.iconText}>My Info</Text>
          </TouchableOpacity>
        </View>
        <ContactListView users={this.state.users} onItemPress={this._navigateToContactShowScreen}/>
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
  myInfoContainer: {
    backgroundColor: '#fff0c8',
    height: 100,
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  column: {
    justifyContent: 'center'
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3bb878',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 33
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f47b4b',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center'
  },
  myInfoText: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.6)'
  }
});
