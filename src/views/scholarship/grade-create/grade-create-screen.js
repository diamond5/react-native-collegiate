import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import GradeDataService from '../../../services/grade-data-service';
import _ from 'lodash';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePickerView from '../../common/date-picker-view';
import CameraScreen from '../../common/camera-screen';
import { CameraKitCamera } from 'react-native-camera-kit';

export default class GradeCreateScreen extends Component {
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
        id: 'grade_create_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      showCamera: false,
      loading: false,
      course: '',
      grade: '',
      notes: ''
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'grade_create_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen() {
    this.props.navigator.pop()
  }

  _onSubmit() {
    this.setState({
      loading: true
    })

    var grade = _.pick(this.state, ['course', 'grade', 'notes'])

    if (this.state.image_attach && this.state.image_attach.uri) {
      grade.attachment = {
        uri: this.state.image_attach.uri,
        name: this.state.course + AppState.currentUser.id,
        type: 'multipart/form-data'
      }
    }

    GradeDataService.create(grade).then((responseJSON) => {
      this.setState({
        loading: false
      })
      this.props.navigator.pop()
      AppEventBus.trigger('grade_created', responseJSON)
    }).catch((error) => {
      this.setState({
        loading: false
      })
    })
  }

  onCheckCameraAuthoPressed() {
    CameraKitCamera.checkDeviceCameraAuthorizationStatus().then((authorizationStatus) =>{
      if (authorizationStatus == true) {
        this.setState({
          showCamera: true
        })
      }
      else {

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
    if (this.state.showCamera)
      return <CameraScreen onImageCapture={(image) => {
          this.setState({
            showCamera: false,
            image_attach: image
          })
        }}/>

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SUBMIT GRADE</Text>
        </View>

        <View style={styles.contentContainer}>
          <KeyboardAwareScrollView
            extraHeight={150}
            indicatorStyle={'white'}
            automaticallyAdjustContentInsets={false}
            style={styles.formContainer}>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Course</Text>
              <TextInput style={styles.formInputText}
                underlineColorAndroid={"transparent"}
                value={this.state.course}
                onChangeText={course => this.setState({course})}/>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Grade</Text>
              <TextInput style={styles.formInputText}
                underlineColorAndroid={"transparent"}
                value={this.state.grade}
                onChangeText={grade => this.setState({grade})}/>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Notes</Text>
              <TextInput style={styles.formTextArea}
                multiline={true}
                underlineColorAndroid={"transparent"}
                value={this.state.notes}
                onChangeText={notes => this.setState({notes})}/>
            </View>

            <View style={styles.formGroup}>
              <TouchableOpacity onPress={this.onCheckCameraAuthoPressed.bind(this)}
                style={{marginTop: 50, marginHorizontal: 25, alignItems: 'center'}}>
                <View style={{height: 36, width: 36, marginBottom: 5, borderRadius: 18, backgroundColor: '#939598', justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={require('../../../../img/icons/camera.png')} />
                </View>
                <Text style={{
                  fontSize: 12,
                  fontFamily: 'Open Sans',
                  fontWeight: '400',
                  color: 'rgba(0, 0, 0, 0.5)',
                  backgroundColor: 'transparent'
                }}>Attach Image</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>

        <View style={styles.footer}>
          <TouchableHighlight
            style={{borderRadius: 10}}
            onPress={this._navigateToPreviousScreen.bind(this)}
            activeOpacity={0.8}
            underlayColor={'#e2e4e5'}>
            <View style={{
                borderColor: 'rgba(0, 0, 0, 0.6)',
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 6,
                alignItems: 'center',
                width: 100,
              }}>
              <Text style={{fontFamily: 'Open Sans', color: 'rgba(0, 0, 0, 0.6)'}}>Cancel</Text>
            </View>
          </TouchableHighlight>
          <View style={{flex: 1}} />
          <TouchableHighlight
            style={{borderRadius: 10}}
            onPress={this._onSubmit.bind(this)}
            activeOpacity={0.8}
            underlayColor={'#e2e4e5'}>
            <View style={{
                borderWidth: 1,
                borderColor: '#fec538',
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 6,
                backgroundColor: '#fec538',
                alignItems: 'center',
                width: 100,
              }}>
              <Text style={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: 14,
                fontFamily: 'Open Sans',
                fontWeight: '400'
              }}>Submit</Text>
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
    paddingHorizontal: 20
  },
  formContainer: {
    paddingTop: 10,
    flex: 1,
  },
  formGroup: {
    marginVertical: 5
  },
  formLabel: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Open Sans'
  },
  formInputText: {
    height: 40,
    borderWidth: 1,
    marginTop: 2,
    paddingHorizontal: 6,
    paddingVertical: 0,
    fontFamily: 'Open Sans',
    fontSize: 15
  },
  formTextArea: {
    height: 120,
    borderWidth: 1,
    marginTop: 2,
    paddingHorizontal: 6,
    paddingVertical: 0,
    fontFamily: 'Open Sans'
  },
  datePicker: {
    justifyContent: 'center',
    height: 40,
    borderWidth: 1,
    marginTop: 2,
    paddingHorizontal: 6,
    paddingVertical: 0,
  },
  datePickerText: {
    fontFamily: 'Open Sans',
    fontSize: 15
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 6
  },
  fileAttachmentIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  fileAttachmentText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.5)',
    marginLeft: -10,
    backgroundColor: 'transparent'
  }
});
