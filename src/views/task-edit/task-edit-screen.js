import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import TaskDataService from '../../services/task-data-service';
import UserDataService from '../../services/user-data-service';
import _ from 'lodash';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePickerView from '../common/date-picker-view';
import PickerView from '../common/picker-view';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

export default class TaskEditScreen extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarButtonColor: '#FFFFFF',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 20,
    navBarBackgroundColor: '#3bb878',
    navBarTextFontFamily: 'Open Sans',
  }

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../../../img/icons/home.png'),
        id: 'task_edit_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: true,
      isDateTimePickerVisible: false,
      due_at: this.props.task.due_at,
      notes:  this.props.task.notes,
      task_type: this.props.task.task_type,
      assigned_to_user_id: this.props.task.assigned_to_user_id,
      users: []
    }
  }

  componentDidMount() {
    UserDataService.getList().then((responseJSON) => {
      this.setState({
        users: responseJSON,
        loading: false
      })
    }).catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'task_edit_screen_homex') {
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

    var task = _.pick(this.state, ['due_at', 'notes', 'task_type', 'assigned_to_user_id'])
    task.id = this.props.task.id

    if (this.state.file_attachment && this.state.file_attachment.uri) {
      task.attachment = {
        uri: this.state.file_attachment.uri,
        name: this.state.file_attachment.fileName,
        type: this.state.file_attachment.type
      }
    }

    TaskDataService.editTask(task).then((responseJSON) => {
      this.setState({
        loading: true
      })
      this.props.navigator.pop()
      AppEventBus.trigger('task_updated', responseJSON)
    }).catch((error) => {
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TASK INFORMATION</Text>
        </View>

        <View style={styles.contentContainer}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            extraHeight={150}
            indicatorStyle={'white'}
            automaticallyAdjustContentInsets={false}
            style={styles.formContainer}>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Subject</Text>
              <TextInput style={styles.formInputText}
                underlineColorAndroid={"transparent"}
                value={this.state.task_type}
                onChangeText={task_type => this.setState({task_type})}/>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Due Date</Text>
              <DatePickerView style={styles.datePicker}
                textStyle={styles.datePickerText}
                format={'MM/DD/YYYY'}
                value={this.state.due_at}
                onConfirm={(due_at) => this.setState({due_at})}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Assigned To</Text>
              <PickerView
                style={styles.datePicker}
                textStyle={styles.datePickerText}
                selectedValue={this.state.assigned_to_user_id}
                onValueChange={(assigned_to_user_id) => this.setState({assigned_to_user_id})}
                items={_.map(this.state.users, (user) => ({label: user.first_name + ' ' + user.last_name, value: user.id}))}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Notes</Text>
              <TextInput style={styles.formTextArea}
                multiline={true}
                underlineColorAndroid={"transparent"}
                value={this.state.notes}
                onChangeText={notes => this.setState({notes})}/>
            </View>

            <View style={[styles.formGroup, {alignItems: 'center'}]}>
              <TouchableOpacity
                onPress={() =>{
                  DocumentPicker.show({
                    filetype: [DocumentPickerUtil.allFiles()],
                  },(error,file) => {
                    this.setState({
                      file_attachment: file
                    })
                  });
                }}
                style={{alignItems: 'center'}}>
                <Image source={require('../../../img/icons/file-attachment-large.png')} />
                <Text style={{
                  fontSize: 12,
                  fontFamily: 'Open Sans',
                  fontWeight: '400',
                  color: 'rgba(0, 0, 0, 0.5)',
                  backgroundColor: 'transparent'
                }}>Attach Form</Text>
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
                backgroundColor: '#FFFFFF'
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
                backgroundColor: '#fec538'
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
    marginTop: 10,
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
    height: 80,
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
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 6
  }
});
