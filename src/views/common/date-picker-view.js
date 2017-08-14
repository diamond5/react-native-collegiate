'use strict'

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Picker,
  Modal,
  TouchableOpacity,
  Text,
  Button,
  PixelRatio
} from 'react-native';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DatePickerView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDateTimePickerVisible: false,
      // date: this.props.date ? this.props.data : new Date()
    }
  }

  _handleDatePicked = (date) => {
    this.props.onConfirm(date.toString())
    this._hideDateTimePicker();
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  render() {
    return (
      <TouchableOpacity style={this.props.style}
        onPress={this._showDateTimePicker.bind(this)}>
        <Text style={this.props.textStyle}>
          {this.props.value ? moment(Date.parse(this.props.value)).format(this.props.format) : this.props.placeholder ? this.props.placeholder : ''}
        </Text>
        <DateTimePicker
          date={this.props.value ? new Date(this.props.value) : new Date()}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  spaceContainer: {
    flex: 1
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },
  buttonBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: 'grey'
  },
  buttonBarSpace: {
    flex: 1
  }
});
