import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import UserDataService from '../../../services/user-data-service';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CameraKitCamera, CameraKitCameraScreen } from 'react-native-camera-kit';
import CameraScreen from '../../common/camera-screen';
import DatePickerView from '../../common/date-picker-view';

export default class MyInfoEditScreen extends Component {
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
        id: 'my_info_edit_screen_home',
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      loading: false,
      ...this.props.user,
      showCamera: false,
      image_attach: undefined
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'my_info_edit_screen_home') {
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

    var user = _.pick(this.state, ['hometown', 'date_of_birth', 'cellphone', 'email', 'facebook_url', 'instagram_url', 'major', 'clubs_orgs'])

    if (this.state.image_attach && this.state.image_attach.uri) {
      user.image = {
        uri: this.state.image_attach.uri,
        name: 'display_image' + AppState.currentUser.id,
        type: 'multipart/form-data'
      }
    }

    UserDataService.updateUser(AppState.currentUser.id, user).then((responseJSON) => {
      this.setState({
        loading: false
      })
      this.props.navigator.pop()
      AppEventBus.trigger('user_updated', responseJSON)
    }).catch(error => {
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
        <KeyboardAwareScrollView style={styles.contentContainer}
          extraHeight={80}
          indicatorStyle={'white'}
          automaticallyAdjustContentInsets={false}>
          <View style={styles.profileContainer}>
            <View style={{flex: 1}}></View>
            <View style={styles.profilePictureContainer}>
              <View style={{}}>
                <View style={styles.pictureBorder}>
                  {
                    this.state.image_attach ? (
                      <Image
                        style={styles.profilePicture}
                        source={{uri: this.state.image_attach.uri}}>
                      </Image>
                    ) : (
                      <Image
                        style={styles.profilePicture}
                        source={{uri: this.state.image}}>
                      </Image>
                    )
                  }
                </View>
                <TouchableOpacity onPress={this.onCheckCameraAuthoPressed.bind(this)} style={styles.cameraButton}>
                  <Image style={styles.cameraIcon} source={require('../../../../img/icons/camera.png')} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1}}></View>
            <View style={styles.profileTextContainer}>
              <Text numberOfLines={1} style={styles.profileTitle}>
                Bailie Sparks
              </Text>
              <Text numberOfLines={1} style={styles.profileSubtitle}>
                President
              </Text>
            </View>
            <View style={{flex: 1}}></View>
          </View>

          <View style={styles.detailContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailColumnLabel}>
                <Text style={styles.detailLabel}>Hometown:</Text>
              </View>
              <View style={styles.columnSeperator}></View>
              <View style={styles.detailColumnValue}>
                <TextInput style={styles.detailValue}
                  underlineColorAndroid="transparent"
                  value={this.state.hometown}
                  onChangeText={hometown => this.setState({hometown}) }/>
              </View>
            </View>
            <View style={styles.rowSeperator}></View>

            <View style={styles.detailRow}>
              <View style={styles.detailColumnLabel}>
                <Text style={styles.detailLabel}>Birthday:</Text>
              </View>
              <View style={styles.columnSeperator}></View>
              <View style={styles.detailColumnValue}>
                <DatePickerView style={styles.datePicker}
                  textStyle={styles.detailValue}
                  placeholder={'Select Date MM/DD/YYYY'}
                  format={'MM/DD/YYYY'}
                  value={this.state.date_of_birth}
                  onConfirm={(date_of_birth) => this.setState({date_of_birth})}
                />
                {/* <TextInput style={styles.detailValue}
                  underlineColorAndroid="transparent"
                  value={this.state.date_of_birth}
                  onChangeText={date_of_birth => this.setState({date_of_birth}) }/> */}
              </View>
            </View>
            <View style={styles.rowSeperator}></View>

            <View style={styles.detailRow}>
              <View style={styles.detailColumnLabel}>
                <Text style={styles.detailLabel}>Phone:</Text>
              </View>
              <View style={styles.columnSeperator}></View>
              <View style={styles.detailColumnValue}>
                <TextInput style={styles.detailValue}
                  underlineColorAndroid="transparent"
                  value={this.state.cellphone}
                  onChangeText={cellphone => this.setState({cellphone}) }/>
              </View>
            </View>
            <View style={styles.rowSeperator}></View>

            <View style={styles.detailRow}>
              <View style={styles.detailColumnLabel}>
                <Text style={styles.detailLabel}>Email:</Text>
              </View>
              <View style={styles.columnSeperator}></View>
              <View style={styles.detailColumnValue}>
                <TextInput style={styles.detailValue}
                  underlineColorAndroid="transparent"
                  value={this.state.email}
                  onChangeText={email => this.setState({email}) }/>
              </View>
            </View>
            <View style={styles.rowSeperator}></View>

            <View style={styles.detailRow}>
              <View style={styles.detailColumnLabel}>
                <Text style={styles.detailLabel}>Facebook:</Text>
              </View>
              <View style={styles.columnSeperator}></View>
              <View style={styles.detailColumnValue}>
                <TextInput style={styles.detailValue}
                  underlineColorAndroid="transparent"
                  value={this.state.facebook_url}
                  onChangeText={facebook_url => this.setState({facebook_url}) }/>
              </View>
            </View>
            <View style={styles.rowSeperator}></View>

            <View style={styles.detailRow}>
              <View style={styles.detailColumnLabel}>
                <Text style={styles.detailLabel}>Instagram:</Text>
              </View>
              <View style={styles.columnSeperator}></View>
              <View style={styles.detailColumnValue}>
                <TextInput style={styles.detailValue}
                  underlineColorAndroid="transparent"
                  value={this.state.instagram_url}
                  onChangeText={instagram_url => this.setState({instagram_url}) }/>
              </View>
            </View>
            <View style={styles.rowSeperator}></View>

            <View style={styles.detailRow}>
              <View style={styles.detailColumnLabel}>
                <Text style={styles.detailLabel}>Major:</Text>
              </View>
              <View style={styles.columnSeperator}></View>
              <View style={styles.detailColumnValue}>
                <TextInput style={styles.detailValue}
                  underlineColorAndroid="transparent"
                  value={this.state.major}
                  onChangeText={major => this.setState({major}) }/>
              </View>
            </View>
            <View style={styles.rowSeperator}></View>

            <View style={styles.detailRowLarge}>
              <View style={styles.detailColumnLabel}>
                <Text style={styles.detailLabel}>Clubs & Organizations:</Text>
              </View>
              <View style={styles.columnSeperator}></View>
              <View style={styles.detailColumnValue}>
                <TextInput style={styles.detailValue}
                  multiline={true}
                  underlineColorAndroid="transparent"
                  value={this.state.clubs_orgs}
                  onChangeText={clubs_orgs => this.setState({clubs_orgs}) }/>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

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
                borderColor: '#3bb878',
                borderRadius: 10,
                width: 100,
                alignItems: 'center',
                paddingVertical: 6,
                backgroundColor: '#3bb878'
              }}>
              <Text style={{
                color: 'rgba(255, 255, 255, 1)',
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
  contentContainer: {
    flex: 1
  },
  profileContainer: {
    // flex: 1,
    flexDirection: 'row'
  },
  profilePictureContainer: {
    justifyContent: 'center',
    paddingVertical: 30
  },
  pictureBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3ab879',
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  profilePicture: {
    height: 130,
    width: 130,
    borderRadius: 65
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#97989b',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraIcon: {
    width: 20,
    height: 17
  },
  profileTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTitle: {
    marginTop: 12,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: 'Open Sans',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  profileSubtitle: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '400',
    fontFamily: 'Open Sans',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  detailContainer: {
    // flex: 1.75
  },
  detailRow: {
    height: 30,
    flexDirection: 'row'
  },
  detailRowLarge: {
    height: 100,
    flexDirection: 'row'
  },
  detailColumnLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 6
  },
  detailColumnValue: {
    flex: 2,
    justifyContent: 'center',
    padding: 6
  },
  rowSeperator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  columnSeperator: {
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  detailLabel: {
    textAlign: 'right',
    flex: 1,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'Open Sans'
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'Open Sans',
    padding: 0
  },
  datePicker: {
    flex: 1,
    padding: 0
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 6
  }
});
