import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

export default class TaskListItemView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      checked: this.props.task.completed_at != null ? true : false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false,
      checked: nextProps.task.completed_at != null ? true : false
    })
  }

  _renderActivityIndicator() {
    return (
      <ActivityIndicator
        animating={true}
        style={styles.activityIndicator}
        size={'large'}
      />
    )
  }

  render() {
    var task = this.props.task
    var date = moment(task.due_at)

    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => this.props.onPress && this.props.onPress(task)}>
          <View style={styles.marginContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                {task.task_type}
              </Text>
              <Text style={styles.textSecondary}
                numberOfLines={1}>
                Due {date.format('D/MM/YY')}
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonFirst} onPress={() => this.props.onButtonFirstPress && this.props.onButtonFirstPress(task)}>
              <Image resizeMode={'contain'} source={require('../../../img/icons/file-attachment.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecond} onPress={() => {
              var checked = !this.state.checked
              this.setState({
                loading: true,
                checked: checked
              })

              this.props.onCheckBoxPress && this.props.onCheckBoxPress(task, checked)
            }}>
              {
                this.state.checked ? (
                  <Image resizeMode={'contain'} source={require('../../../img/icons/checkbox-checked.png')} />
                )  : (
                  <Image resizeMode={'contain'} source={require('../../../img/icons/checkbox.png')} />
                )
              }
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        { this.state.loading ? this._renderActivityIndicator() : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  marginContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    marginRight: 10
  },
  textContainer: {
    flex: 7,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  textPrimary: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(77, 77, 79, 1)'
  },
  textSecondary: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '500',
    color: 'rgba(194, 194, 194, 1)'
  },
  buttonFirst: {
    flex: 1.5,
    justifyContent: 'center'
  },
  buttonSecond: {
    flex: 1.5,
    justifyContent: 'center'
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})
