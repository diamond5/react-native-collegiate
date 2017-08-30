import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import PointsDataService from '../../services/points-data-service';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

var GOAL = 1000

export default class PointsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarButtonColor: '#FFFFFF',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 20,
    navBarBackgroundColor: '#0ebcd8',
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
      loading: true,
      pointsTransactions: [],
      percentage: 0
    }
  }

  componentDidMount() {
    PointsDataService.getAllPointsTransactions().then(responseJSON => {
      this.setState({
        loading: false,
        pointsTransactions: responseJSON,
      })
    }).catch(error => {
      this.setState({
        loading: false
      })
    })

    AppEventBus.off('points_transaction_created')
    AppEventBus.on('points_transaction_created', (pointsTransaction) => {
      var pointsTransactions = this.state.pointsTransactions.slice(0)
      pointsTransactions.unshift(pointsTransaction)

      this.setState({
        pointsTransactions
      })
    })
  }

  componentWillUnmount() {
    AppEventBus.off('points_transaction_created')
  }


  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'task_show_screen_home') {
        this.props.navigator.pop()
      }
    }
  }

  _navigateToPreviousScreen() {
    this.props.navigator.pop()
  }

  _navigateToCreatePointsScreen() {
    this.props.navigator.push({
      screen: 'PointsCreateScreen'
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
    var totalPoints = _.reduce(this.state.pointsTransactions, (sum, pointsTransaction) => { return sum + pointsTransaction.amount}, 0)

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}></View>
        <View style={styles.circleContainer}>
          <AnimatedCircularProgress
            size={175}
            width={30}
            fill={(100.0 * totalPoints / GOAL)}
            rotation={0}
            tintColor="#ffce46"
            backgroundColor="#aeb0b3" />
            <View style={styles.innerCircle}><Image source={require('../../../img/icons/trophy.png')}/></View>
        </View>
        <View style={{flex: 1}}></View>
        <Text style={styles.pointsText}>Points Total - {totalPoints}</Text>
        <View style={{flex: 4}}></View>
        <TouchableOpacity style={styles.addButton} onPress={this._navigateToCreatePointsScreen.bind(this)}>
          <Image source={require('../../../img/icons/add.png')}/>
        </TouchableOpacity>
        {this.state.loading ? this._renderActivityIndicator() : null}
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
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerCircle: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#0ebcd8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pointsText: {
    fontSize: 30,
    fontFamily: 'Open Sans',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.7)',
    textAlign: 'center'
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
