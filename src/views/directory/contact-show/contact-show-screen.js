import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Communications from 'react-native-communications';

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
        id: 'contact_show_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: false,
      user: this.props.user
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'contact_show_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen = () => {
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

  _callUser = () => {
    let user = this.state.user

    if (user.cellphone)
      Communications.phonecall(user.cellphone, true)
  }

  _sendMessage = () => {
    let user = this.state.user

    if (user.cellphone)
      Linking.openURL('sms:' + user.cellphone);
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
        <TouchableOpacity style={styles.backButton} onPress={this._navigateToPreviousScreen}>
          <Image source={require('../../../../img/icons/back.png')} />
          <Text style={styles.backbuttonText}>Directory</Text>
        </TouchableOpacity>
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
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.icon} onPress={this._callUser}>
            <Image source={require('../../../../img/icons/call-large.png')}/>
            <Text style={styles.iconText}>Call</Text>
          </TouchableOpacity>
          <View style={{flex: 1}}></View>
          <TouchableOpacity style={styles.icon} onPress={this._sendMessage}>
            <Image source={require('../../../../img/icons/message-large.png')}/>
            <Text style={styles.iconText}>Message</Text>
          </TouchableOpacity>
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
  // header: {
  //   position: 'absolute'
  //   height: 30,
  //   backgroundColor: 'transparent',
  //   justifyContent: 'center',
  //   paddingLeft: 6
  // },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1
  },
  backbuttonText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'transparent'
  },
  profileContainer: {
    backgroundColor: '#fff0c8',
    flex: 1.40
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
  },
  icon: {
    padding: 20,
    alignItems: 'center'
  },
  iconText: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: '#3366cc'
  }
});
