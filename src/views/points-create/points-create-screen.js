import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
  PixelRatio,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PointsDataService from '../../services/points-data-service';
import _ from 'lodash';
import moment from 'moment';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DatePickerView from '../common/date-picker-view';

export default class PointsCreateScreen extends Component {
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
        id: 'points_create_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: false,
      isDateTimePickerVisible: false,
      title:  '',
      amount: ''
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'points_create_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen() {
    this.props.navigator.pop()
  }

  _onSubmit() {
    var pointsTransaction = {
      notes: this.state.title,
      amount: this.state.amount,
      occurred_at: (new Date()).toString()
    }

    this.setState({
      loading: true
    })

    PointsDataService.createPointsTransaction(pointsTransaction).then((responseJSON) => {
      this.setState({
        loading: true
      })
      this.props.navigator.pop()
      AppEventBus.trigger('points_transaction_created', responseJSON)
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
          <Text style={styles.headerTitle}>POINTS INFORMATION</Text>
        </View>

        <View style={styles.contentContainer}>
          <KeyboardAwareScrollView
            extraHeight={150}
            indicatorStyle={'white'}
            automaticallyAdjustContentInsets={false}
            style={styles.formContainer}>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Title</Text>
              <TextInput style={styles.formInputText}
                underlineColorAndroid={"transparent"}
                value={this.state.title}
                onChangeText={title => this.setState({title})}/>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Amount</Text>
              <TextInput style={styles.formInputText}
                underlineColorAndroid={"transparent"}
                value={this.state.amount}
                onChangeText={amount => this.setState({amount})}/>
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
                paddingVertical: 6
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
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.7)'
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  formContainer: {
    paddingTop: 30,
    flex: 1,
    // backgroundColor: 'pink'
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
    paddingVertical: 30
  }
});
