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
import MinutesDataService from '../../../services/minutes-data-service';
import _ from 'lodash';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePickerView from '../../common/date-picker-view';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import PickerView from '../../common/picker-view';

export default class MinutesCreateScreen extends Component {
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
        id: 'minutes_create_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: false,
      organization_id: '',
      name: '',
      occurred_at: '',
      notes: ''
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'minutes_create_screen_home') {
        this.props.navigator.popToRoot()
      }
    }
  }

  _navigateToPreviousScreen() {
    this.props.navigator.pop()
  }

  _onSubmit() {
    var minutes = _.pick(this.state, ['organization_id', 'name', 'occurred_at', 'notes'])
    this.setState({
      loading: true
    })

    if (this.state.file_attachment && this.state.file_attachment.uri) {
      minutes.attachment = {
        uri: this.state.file_attachment.uri,
        name: this.state.file_attachment.fileName,
        type: this.state.file_attachment.type
      }
    }

    MinutesDataService.createMinutes(minutes).then((responseJSON) => {
      this.setState({
        loading: true
      })
      this.props.navigator.pop()
      AppEventBus.trigger('minutes_created', responseJSON)
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
    var user = AppState.currentUser

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TASK INFORMATION</Text>
        </View>

        <View style={styles.contentContainer}>
          <KeyboardAwareScrollView
            extraHeight={150}
            indicatorStyle={'white'}
            automaticallyAdjustContentInsets={false}
            style={styles.formContainer}>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Team/Committee</Text>
              <PickerView
                style={styles.datePicker}
                textStyle={styles.datePickerText}
                selectedValue={this.state.organization_id}
                onValueChange={(organization_id) => this.setState({organization_id})}
                items={_.map(user.organizations, (organization) => ({label: organization.name, value: organization.id}))}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Meeting Name</Text>
              <TextInput style={styles.formInputText}
                underlineColorAndroid={"transparent"}
                value={this.state.name}
                onChangeText={name => this.setState({name})}/>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Meeting Date</Text>
              <DatePickerView style={styles.datePicker}
                textStyle={styles.datePickerText}
                format={'DD/MM/YYYY'}
                value={this.state.occurred_at}
                onConfirm={(occurred_at) => this.setState({occurred_at})}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}><Text style={{color: 'red'}}>*</Text> Details</Text>
              <TextInput style={styles.formTextArea}
                multiline={true}
                underlineColorAndroid={"transparent"}
                value={this.state.notes}
                onChangeText={notes => this.setState({notes})}/>
            </View>
          </KeyboardAwareScrollView>
        </View>

        <View style={styles.footer}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <TouchableOpacity
              onPress={() =>{
                DocumentPicker.show({
                  filetype: [DocumentPickerUtil.images()],
                },(error,file) => {
                  this.setState({
                    file_attachment: file
                  })
                });
              }}
              style={styles.fileAttachmentIcon}>
              <Image source={require('../../../../img/icons/file-attach.png')}/>
              <Text style={styles.fileAttachmentText}>Attach document</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', flexDirection: 'column-reverse'}}>
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
            <View style={{height: 6}} />
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
    alignItems: 'center',
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
