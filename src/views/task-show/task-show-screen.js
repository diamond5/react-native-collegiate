import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight
} from 'react-native';
import TaskDataService from '../../services/task-data-service';
import _ from 'lodash';
import moment from 'moment';
import DatePickerView from '../common/date-picker-view';
import OpenFile from 'react-native-doc-viewer';

export default class TaskShowScreen extends Component {
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
        id: 'task_show_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: false,
      task: this.props.task,
      checked: this.props.task.completed_at != null ? true : false
    }
  }

  componentDidMount() {
    AppEventBus.on('task_updated', this._taskUpdated)
  }

  componentWillUnmount() {
    AppEventBus.off('task_updated', this._taskUpdated)
  }

  _taskUpdated = (task) => {
    this.setState({
      task
    })
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'task_show_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen() {
    this.props.navigator.pop()
  }

  _navigateToTaskEditScreen

  _navigateToTaskEditScreen() {
    this.props.navigator.push({
      screen: 'TaskEditScreen',
      passProps: {
        task: this.state.task
      }
    })
  }

  _markComplete() {
    var checked = !this.state.checked
    this.setState({
      checked: checked,
      loading: true
    })

    TaskDataService.markTask(this.state.task.id, checked ? 'complete' : 'incomplete').then((responseJSON) => {
      this.setState({
        loading: false
      })

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

  _openAttachment = () => {
    var task = this.state.task
    this.setState({
      loading: true
    })

    OpenFile.openDoc([{
      url: task.attachment,
      fileName:"sample"
    }], (error, url) => {
      this.setState({
        loading: false
      })

      if (error) {
        alert(JSON.stringify(error))
      }
    })
  }

  render() {
    var task = this.state.task

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TASK INFORMATION</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Subject</Text>
              <Text style={styles.formText}>{task.task_type}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Due Date</Text>
              <Text style={styles.formText}>{moment(task.due_at).format('MM/DD/YYYY')}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Notes</Text>
              <Text style={styles.formText}>{task.notes}</Text>
            </View>

            <TouchableOpacity onPress={this._openAttachment}
              style={{marginTop: 50, paddingHorizontal: 25,}}>
              <Image source={require('../../../img/icons/file-attachment-large.png')} />
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.footer}>
          <TouchableHighlight
            style={{borderRadius: 10}}
            onPress={this._navigateToTaskEditScreen.bind(this)}
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
              }}>Edit</Text>
            </View>
          </TouchableHighlight>
          <View style={{flex: 1}}></View>
          <TouchableHighlight
            style={{
              borderRadius: 10
            }}
            onPress={this._markComplete.bind(this)}
            activeOpacity={0.8}
            underlayColor={'transparent'}
            >
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 6,
                flexDirection: 'row',
                borderRadius: 10
              }}>
              <Text style={{
                paddingRight: 0,
                fontSize: 14,
                fontFamily: 'Open Sans',
                fontWeight: '400',
                color: 'rgba(0, 0, 0, 0.6)'
              }}>Mark Completed</Text>
              {
                this.state.checked ? (
                  <Image resizeMode={'contain'} source={require('../../../img/icons/checkbox-checked.png')} />
                )  : (
                  <Image resizeMode={'contain'} source={require('../../../img/icons/checkbox.png')} />
                )
              }
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
