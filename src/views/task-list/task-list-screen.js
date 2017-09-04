import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  ListView,
  PixelRatio,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TaskDataService from '../../services/task-data-service';
import TaskListView from './task-list-view';
import _ from 'lodash';
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class TaskListScreen extends Component {
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
        id: 'task_list_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      tasks: [],
      loading: true,
      refreshing: false,
      filter: 'pending',
      tabSelected: 0
    }
  }

  componentDidMount() {
    this._getTasks()
    AppEventBus.on('task_created', this._taskCreated)
    AppEventBus.on('task_updated', this._taskUpdated)
  }

  componentWillUnmount() {
    AppEventBus.off('task_created', this._taskCreated)
    AppEventBus.off('task_updated', this._taskUpdated)
  }

  _taskCreated = (task) => {
    var tasks = this.state.tasks.slice(0)
    tasks.unshift(task)

    this.setState({
      tasks
    })
  }

  _taskUpdated = (task) => {
    var tasks = _.map(this.state.tasks, (taskItem) => taskItem.id == task.id ? task : taskItem)

    this.setState({
      tasks
    })
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'task_list_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _refreshTasks() {
    this.setState({
      refreshing: true
    })

    this._getTasks()
  }

  _getTasks() {
    TaskDataService.getAllTasks(1).then(responseJSON => {
      this.setState({
        tasks: responseJSON,
        loading: false,
        refreshing: false
      })
    }).catch(error => {
      this.setState({
        loading: false,
        refreshing: false
      })
    })
  }

  _navigateToCreateTask() {
    this.props.navigator.push({
      screen: 'CreateTaskScreen'
    })
  }

  _navigateToTaskShow(task) {
    this.props.navigator.push({
      screen: 'TaskShowScreen',
      passProps: {
        task
      }
    })
  }

  _markTask(task, status) {
    TaskDataService.markTask(task.id, status ? "complete" : 'incomplete').then((responseJSON) => {
      var updatedTasks = _.map(this.state.tasks, (taskItem) => {
        if (taskItem.id == responseJSON.id)
          return responseJSON
        else
          return taskItem
      })

      this.setState({
        tasks: updatedTasks
      })
    }).catch((error) => {
      this.forceUpdate()
    })
  }

  _renderActivityIndicator() {
    return (
      <ActivityIndicator
        size={'large'}
        style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        animating={true}/>
    )
  }

  _tabSelected = (tabIndex) => {
    this.setState({
      tabSelected: tabIndex
    })
  }

  render() {
    var actionRequiredTasks = _.filter(this.state.tasks, (task) => task.completed_at == null)
    var completedTasks      = _.filter(this.state.tasks, (task) => task.completed_at != null)

    return (
      <View style={styles.container}>
        <View style={styles.tabBar}>
          <TouchableWithoutFeedback style={{flex: 1}} onPress={() => this._tabSelected(0)}>
            <View style={{flex: 1}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.tabText}>{'Action Required(' + actionRequiredTasks.length + ')'}</Text>
              </View>
              {this.state.tabSelected == 0 ? <View style={{height: 4, backgroundColor: '#fec437'}}></View> : null}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={{flex: 1}} onPress={() => this._tabSelected(1)}>
            <View style={{flex: 1}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.tabText}>{'Completed(' + completedTasks.length + ')'}</Text>
              </View>
              {this.state.tabSelected == 1 ? <View style={{height: 4, backgroundColor: '#fec437'}}></View> : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TaskListView
          style={{flex: 1}}
          tasks={this.state.tabSelected == 0 ? actionRequiredTasks : completedTasks}
          onItemPress={this._navigateToTaskShow.bind(this)}
          onItemCheckBoxPress={this._markTask.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._refreshTasks.bind(this)}
            />
          }
          />
        <TouchableOpacity style={styles.addButton} onPress={this._navigateToCreateTask.bind(this)}>
          <Image source={require('../../../img/icons/add.png')}/>
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
  },
  tabBar: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#bde7d2'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Open Sans',
    color: 'rgba(0, 0, 0, 0.7)',
    textAlign: 'center'
  }
});
