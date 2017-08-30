import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  PixelRatio,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import GradeModal from './grade-modal';

export default class GradeShowScreen extends Component {
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
        id: 'grade_show_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: false,
      grade: this.props.grade,
      showGradeModal: false
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'grade_show_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen() {
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

  _showGradeModal = () => {
    this.setState({
      showGradeModal: true
    })
  }

  _hideGradeModal = () => {
    this.setState({
      showGradeModal: false
    })
  }

  render() {
    var grade = this.state.grade

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>GRADE INFORMATION</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Course</Text>
              <Text style={styles.formText}>{grade.course}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Grade</Text>
              <Text style={styles.formText}>{grade.grade}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Notes</Text>
              <Text style={styles.formText}>{grade.notes}</Text>
            </View>

            <TouchableOpacity onPress={this._showGradeModal}
              style={{marginTop: 50, marginHorizontal: 25, flexDirection: 'row', alignItems: 'flex-end'}}>
              <View style={{height: 36, width: 36, borderRadius: 18, backgroundColor: '#3bb878', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../../../img/icons/camera.png')} />
              </View>
              <Text style={{
                fontSize: 12,
                fontFamily: 'Open Sans',
                fontWeight: '400',
                color: 'rgba(0, 0, 0, 0.5)',
                backgroundColor: 'transparent'
              }}>View Grade</Text>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.footer}>
          <TouchableHighlight
            style={{borderRadius: 10}}
            onPress={this._navigateToPreviousScreen.bind(this)}
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
                fontSize: 14,
                fontFamily: 'Open Sans',
                fontWeight: '400',
                color: 'rgba(0, 0, 0, 0.6)'
              }}>Back</Text>
            </View>
          </TouchableHighlight>
          <View style={{flex: 1}}></View>
        </View>
        <GradeModal
          transparent={true}
          visible={this.state.showGradeModal}
          animationType="fade"
          style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          onClosePressed={this._hideGradeModal}
          image={grade.attachment}
          onRequestClose={this._hideGradeModal}
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
    fontWeight: '400'
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 4
  },
  formContainer: {
    flex: 1,
    // backgroundColor: 'pink'
  },
  formRow: {
    height: 80,
    paddingHorizontal: 25,
    justifyContent: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  formGroup: {
    marginVertical: 5
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'Open Sans'
  },
  formText: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.7)',
    fontFamily: 'Open Sans'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 45
  }
});
