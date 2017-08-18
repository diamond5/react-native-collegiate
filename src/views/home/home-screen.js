import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import CircularButtonWithIcon from './circular-button-with-icon';
import { Navigation } from 'react-native-navigation';

export default class HomeScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      user: AppState.currentUser
    }
  }

  _logOut = () => {
    AppState.remove('currentUser', () => {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'LoginScreen',
          title: 'Login'
        },
        animationType: 'none'
      });
    })
  }

  _navigateToChannelListScreen = () => {
    this.props.navigator.push({
      screen: 'ChannelListScreen',
      title: 'Channels'
    })
  }

  _navigateToTaskListScreen = () => {
    this.props.navigator.push({
      screen: 'TaskListScreen',
      title: 'Tasks'
    })
  }

  _navigateToCalendarScreen = () => {
    this.props.navigator.push({
      screen: 'EventListScreen',
      title: 'Calendar'
    })
  }

  _navigateToPointsScreen = () => {
    this.props.navigator.push({
      screen: 'PointsScreen',
      title: 'Points'
    })
  }

  _navigateToDirectoryScreen = () => {
    this.props.navigator.push({
      screen: 'ContactListScreen',
      title: 'Directory'
    })
  }

  _navigateToMyInfoShowScreen = () => {
    this.props.navigator.push({
      screen: 'MyInfoShowScreen',
      title: 'My Info'
    })
  }

  _navigateToBudgetsListScreen = () => {
    this.props.navigator.push({
      screen: 'BudgetsListScreen',
      title: 'Budgets'
    })
  }

  _navigateToDuesScreen = () => {
    this.props.navigator.push({
      screen: 'DuesWebScreen',
      title: 'Dues'
    })
  }

  _navigateToMinutesListScreen = () => {
    this.props.navigator.push({
      screen: 'MinutesListScreen',
      title: 'Minutes'
    })
  }

  _navigateToGradeListScreen = () => {
    this.props.navigator.push({
      screen: 'GradeListScreen',
      title: 'Scholarship'
    })
  }

  render() {
    var user = this.state.user

    return (
      <View style={styles.container}>
        {
          Platform.OS == 'ios' ? <View style={styles.statusBar}></View> : null
        }
        <View
          style={styles.header}>
          <TouchableOpacity
            onPress={this._logOut}
            style={styles.headerButtonLeft}>
            <Image
              source={require('../../../img/home/settings.png')}/>
          </TouchableOpacity>
          <View
            style={styles.headerContent}>
            <Image
              source={require('../../../img/home/rowflow-logo.png')}/>
          </View>
          <TouchableOpacity
            style={styles.headerButtonLeft}>
            {/* <Image
              source={require('../../../img/home/search.png')}/> */}
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>

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
            <View style={{flex: 1}}></View>
            <View style={styles.profileTextContainer}>
              <Text numberOfLines={1} style={styles.profileTitle}>
                Welcome, {user.first_name}
              </Text>
              <Text numberOfLines={1} style={styles.profileSubtitle}>
                You have 0 unread items
              </Text>
            </View>
            <View style={{flex: 1}}></View>
          </View>

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonsRow}>
              <CircularButtonWithIcon
                onPress={this._navigateToChannelListScreen}
                icon={require('../../../img/home/channels.png')}
                title={"Channels"}
                buttonColor={"#0ebcd8"}/>
              <CircularButtonWithIcon
                onPress={this._navigateToTaskListScreen}
                icon={require('../../../img/home/tasks.png')}
                title={"Tasks"}
                buttonColor={"#3ab879"}/>
              <CircularButtonWithIcon
                onPress={this._navigateToCalendarScreen}
                icon={require('../../../img/home/calendar.png')}
                title={"Calendar"}
                buttonColor={"#0ebcd8"}/>
            </View>
            <View style={styles.buttonsRow}>
              <CircularButtonWithIcon
                onPress={this._navigateToPointsScreen}
                icon={require('../../../img/home/points.png')}
                title={"Points"}
                buttonColor={"#0ebcd8"}/>
              <CircularButtonWithIcon
                onPress={this._navigateToDirectoryScreen}
                icon={require('../../../img/home/directory.png')}
                title={"Directory"}
                buttonColor={"#ffce46"}/>
              <CircularButtonWithIcon
                onPress={this._navigateToMyInfoShowScreen}
                icon={require('../../../img/home/my_info.png')}
                title={"My Info"}
                buttonColor={"#f47b4b"}/>
            </View>
            <View style={styles.buttonsRow}>
              <CircularButtonWithIcon
                onPress={this._navigateToBudgetsListScreen}
                icon={require('../../../img/home/expenses.png')}
                title={"Expenses"}
                buttonColor={"#ffce46"}/>
              <CircularButtonWithIcon
                onPress={this._navigateToDuesScreen}
                icon={require('../../../img/home/dues.png')}
                title={"Dues"}
                buttonColor={"#3ab879"}/>
              <CircularButtonWithIcon
                onPress={this._navigateToMinutesListScreen}
                icon={require('../../../img/home/minutes.png')}
                title={"Minutes"}
                buttonColor={"#f47b4b"}/>
            </View>
            <View style={styles.buttonsRow}>
              <View style={styles.buttonContainer}></View>
              <CircularButtonWithIcon
                onPress={this._navigateToGradeListScreen}
                icon={require('../../../img/home/scholarship.png')}
                title={"Scholarship"}
                buttonColor={"#ffcf46"}/>
              <View style={styles.buttonContainer}></View>
            </View>
          </View>
        </View>
        {/* <View style={styles.footer}>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#daf5f9'
  },
  statusBar: {
    height: 20,
    backgroundColor: '#FFFFFF'
  },
  header: {
    height: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerButtonLeft: {
    width: 50,
    alignItems: 'center'
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerButtonRight: {
    width: 50,
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1
  },
  profileContainer: {
    flex: 1
  },
  profilePictureContainer: {
    alignItems: 'center'
  },
  pictureBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3ab879',
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  profilePicture: {
    height: 82,
    width: 82,
    borderRadius: 41
  },
  profileTextContainer: {
    alignItems: 'center'
  },
  profileTitle: {
    fontSize: 26,
    lineHeight: 26,
    fontWeight: '300',
    fontFamily: 'Open Sans'
  },
  profileSubtitle: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 11,
    fontWeight: '100',
    fontFamily: 'Open Sans'
  },
  buttonsContainer: {
    flex: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    flex: 1
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonCircle: {
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonIcon: {
    width: 30,
    height: 30
  },
  buttonText: {
    marginTop: 3,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '100',
    fontFamily: 'Open Sans'
  },
  footer: {
    height: 40
  }

});
