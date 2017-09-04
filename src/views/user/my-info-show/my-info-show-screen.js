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
  ScrollView
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import UserDataService from '../../../services/user-data-service';

export default class MyInfoShowScreen extends Component {
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
        id: 'my_info_show_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: false,
      user: AppState.currentUser
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    })

    UserDataService.getUser(AppState.currentUser.id).then(response => {
      this.setState({
        user: response,
        loading: false
      })
    }).catch(error => {
      this.setState({
        loading: false
      })
    })

    AppEventBus.off('user_updated')
    AppEventBus.on('user_updated', (userJSON) => {
      this.setState({
        user: userJSON
      })
    })
  }

  componentWillUnmount() {
    AppEventBus.off('user_updated')
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'my_info_show_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen() {
    this.props.navigator.pop()
  }

  _navigateToMyInfoEditScreen() {
    this.props.navigator.push({
      screen: 'MyInfoEditScreen',
      passProps: {
        user: this.state.user
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
    var user = this.state.user

    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={{flex: 1}}></View>
          <View style={styles.profilePictureContainer}>
            <View
              style={styles.pictureBorder}>
              <Image
                style={styles.profilePicture}
                source={{uri: user.image}}>
              </Image>
            </View>
          </View>
          <View style={styles.profileTextContainer}>
            <Text numberOfLines={1} style={styles.profileTitle}>
              {user.first_name || user.last_name ? user.first_name + ' ' + user.last_name : 'N/A'}
            </Text>
            <Text numberOfLines={1} style={styles.profileSubtitle}>
              {user.clubs_orgs ? user.clubs_orgs : 'N/A'}
            </Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>

        <ScrollView style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <View style={styles.detailColumnLabel}>
              <Text style={styles.detailText}>Hometown:</Text>
            </View>
            <View style={styles.columnSeperator}></View>
            <View style={styles.detailColumnValue}>
              <Text style={styles.detailText}>{user.hometown ? user.hometown : 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.rowSeperator}></View>

          <View style={styles.detailRow}>
            <View style={styles.detailColumnLabel}>
              <Text style={styles.detailText}>Birthday:</Text>
            </View>
            <View style={styles.columnSeperator}></View>
            <View style={styles.detailColumnValue}>
              <Text style={styles.detailText}>{user.date_of_birth ? moment(user.date_of_birth).format('DD/MM/YYYY') : 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.rowSeperator}></View>

          <View style={styles.detailRow}>
            <View style={styles.detailColumnLabel}>
              <Text style={styles.detailText}>Phone:</Text>
            </View>
            <View style={styles.columnSeperator}></View>
            <View style={styles.detailColumnValue}>
              <Text style={styles.detailText}>{user.cellphone ? user.cellphone : 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.rowSeperator}></View>

          <View style={styles.detailRow}>
            <View style={styles.detailColumnLabel}>
              <Text style={styles.detailText}>Email:</Text>
            </View>
            <View style={styles.columnSeperator}></View>
            <View style={styles.detailColumnValue}>
              <Text style={styles.detailText}>{user.email ? user.email : 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.rowSeperator}></View>

          <View style={styles.detailRow}>
            <View style={styles.detailColumnLabel}>
              <Text style={styles.detailText}>Facebook:</Text>
            </View>
            <View style={styles.columnSeperator}></View>
            <View style={styles.detailColumnValue}>
              <Text style={styles.detailText}>{user.facebook_url ? user.facebook_url : 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.rowSeperator}></View>

          <View style={styles.detailRow}>
            <View style={styles.detailColumnLabel}>
              <Text style={styles.detailText}>Instagram:</Text>
            </View>
            <View style={styles.columnSeperator}></View>
            <View style={styles.detailColumnValue}>
              <Text style={styles.detailText}>{user.instagram_url ? user.instagram_url : 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.rowSeperator}></View>

          <View style={styles.detailRow}>
            <View style={styles.detailColumnLabel}>
              <Text style={styles.detailText}>Major:</Text>
            </View>
            <View style={styles.columnSeperator}></View>
            <View style={styles.detailColumnValue}>
              <Text style={styles.detailText}>{user.major ? user.major : 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.rowSeperator}></View>

          <View style={styles.detailRow}>
            <View style={styles.detailColumnLabel}>
              <Text style={styles.detailText}>Year in School:</Text>
            </View>
            <View style={styles.columnSeperator}></View>
            <View style={styles.detailColumnValue}>
              <Text style={styles.detailText}>Senior</Text>
            </View>
          </View>
          <View style={styles.rowSeperator}></View>

          <View style={styles.detailRowLarge}>
            <View style={styles.detailColumnLabel}>
              <Text style={styles.detailText}>Clubs & Organizations:</Text>
            </View>
            <View style={styles.columnSeperator}></View>
            <View style={styles.detailColumnValue}>
              <Text style={styles.detailText}>{user.clubs_orgs ? user.clubs_orgs : 'N/A'}</Text>
            </View>
          </View>
        </ScrollView>

          {/* <View style={{flex: 1}}></View>           */}

        <View style={styles.footer}>
          <View style={{flex: 1}}></View>
          <TouchableHighlight
            style={{borderRadius: 10}}
            onPress={this._navigateToMyInfoEditScreen.bind(this)}
            activeOpacity={0.8}
            underlayColor={'#e2e4e5'}>
            <View style={{
                borderWidth: 1,
                borderColor: '#fec538',
                borderRadius: 10,
                width: 100,
                alignItems: 'center',
                paddingVertical: 6,
                backgroundColor: '#fec538'
              }}>
              <Text style={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: 14,
                fontFamily: 'Open Sans',
                fontWeight: '400'
              }}>Edit</Text>
            </View>
          </TouchableHighlight>
        </View>

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
  profileContainer: {
    backgroundColor: '#fff0c8',
    flex: 1
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  profilePictureContainer: {
    alignItems: 'center'
  },
  pictureBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3ab879',
    width: 156,
    height: 156,
    borderRadius: 78,
  },
  profilePicture: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  profileTextContainer: {
    alignItems: 'center'
  },
  profileTitle: {
    marginTop: 12,
    fontSize: 22,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: 'Open Sans',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  profileSubtitle: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '400',
    fontFamily: 'Open Sans',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  detailRow: {
    height: 30,
    flexDirection: 'row'
  },
  detailRowLarge: {
    height: 100,
    flexDirection: 'row'
  },
  detailColumnLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 6
  },
  detailColumnValue: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6
  },
  rowSeperator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  columnSeperator: {
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  detailText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'Open Sans'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 6,
    paddingBottom: 30
  }
});
