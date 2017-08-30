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
import GradeDataService from '../../../services/grade-data-service';
import GradeListView from './grade-list-view';

export default class GradeListScreen extends Component {
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
        id: 'grade_list_home',
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: true,
      refreshing: false,
      grades: []
    }
  }

  componentDidMount() {
    this._getGrades()

    AppEventBus.off('grade_created')
    AppEventBus.on('grade_created', (grade) => {
      var grades = this.state.grades.slice(0)
      grades.push(grade)

      this.setState({
        grades
      })
    })
  }

  _refreshGrades() {
    this.setState({
      refreshing: true
    })

    this._getGrades()
  }

  _getGrades() {
    GradeDataService.getList().then((grades) => {
      this.setState({
        loading: false,
        refreshing: false,
        grades
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
      if (event.id == 'grade_list_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen() {
    this.props.navigator.pop()
  }

  _navigateToGradeShowScreen = (grade) => {
    this.props.navigator.push({
      screen: 'GradeShowScreen',
      title: 'Scholarship',
      passProps: {
        grade
      }
    })
  }

  _navigateToGradeCreate = () => {
    this.props.navigator.push({
      screen: 'GradeCreateScreen',
      title: 'Scholarship'
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
          <Text style={styles.headerTitle}>My Grades</Text>
        </View>
        <GradeListView
          style={{flex: 1}}
          grades={this.state.grades}
          onItemPress={this._navigateToGradeShowScreen}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._refreshGrades.bind(this)}
            />
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={this._navigateToGradeCreate}>
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
  header: {
    height: 30,
    backgroundColor: '#e2e4e5',
    justifyContent: 'center',
    paddingLeft: 6
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400'
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
