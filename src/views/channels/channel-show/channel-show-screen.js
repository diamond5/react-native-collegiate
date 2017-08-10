import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Platform
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import MessageListView from './message-list-view';
import ChannelDataService from '../../../services/channel-data-service';
import config from '../../../config/config';
var io = require('socket.io-client');

export default class ChannelShowScreen extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarButtonColor: '#FFFFFF',
    navBarTextColor: '#FFFFFF',
    navBarBackgroundColor: '#00bcd8',
    navBarTextFontFamily: 'Open Sans',
  }

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../../../../img/icons/home.png'),
        id: 'channel_show_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      loading: true,
      refreshing: false,
      message: ''
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this._getMessages()
    this.socket = io(config.socket_server_url);
    this.socket.on('chat_message_group_' + this.props.channel.id, (message) => {
      message = JSON.parse(message)

      if (message.from_user_id != AppState.currentUser.id) {
        var messages = this.state.messages
        messages.unshift(message)
        this.setState({
          messages
        })
      }
    });
  }

  componentWillUnmount() {
    this.socket.removeAllListeners('chat_message_group_' + this.props.channel.id);
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'channel_show_screen_home') {
        this.props.navigator.pop()
      }
    }
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _refreshMessages() {
    this.setState({
      refreshing: true
    })

    this._getMessages()
  }

  _getMessages() {
    ChannelDataService.getChannelMessages(this.props.channel.id).then((messages) => {
      this.setState({
        loading: false,
        refreshing: false,
        messages: messages.reverse(),
      })
    }).catch((error) => {
      this.setState({
        loading: false,
        refreshing: false
      })
    })
  }

  _sendMessage = () => {
    var message = this.state.message.trim()
    this.setState({
      message: ''
    })

    ChannelDataService.sendMessage(this.props.channel.id, message).then((responseMessage) => {
      var messages = this.state.messages
      messages.unshift(responseMessage)
      this.setState({
        messages
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
    var channel = this.props.channel

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={this._navigateToPreviousScreen}>
            <Image source={require('../../../../img/icons/back.png')} />
            <Text style={styles.headerTitle}>Back</Text>
          </TouchableOpacity>
          <View style={styles.channelTitleContainer}>
            <Image style={{width: 20, height: 20}} source={require('../../../../img/icons/channel-small.png')} />
            <Text style={styles.headerTitle}>{channel.name}</Text>
          </View>
        </View>
        <MessageListView
          ref={(messageListView) => this.messageListView = messageListView}
          style={{flex: 1}}
          messages={this.state.messages}
          onItemPress={this._navigateToNoWhere}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this._refreshMessages.bind(this)}
          //   />
          // }
        />
        <View style={styles.footer}>
          <TextInput style={styles.textInput}
            value={this.state.message}
            onChangeText={(message) => this.setState({message})}
            underlineColorAndroid={"transparent"}
            placeholder="Type a reply..."
            multiline={true}
            />
            <View style={{justifyContent: 'flex-end', padding: 10}}>
              <TouchableHighlight
                style={{borderRadius: 10}}
                onPress={this._sendMessage}
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
                  <Text style={{fontFamily: 'Open Sans', color: 'rgba(0, 0, 0, 0.6)'}}>Send</Text>
                </View>
              </TouchableHighlight>
            </View>
        </View>
        { Platform.OS =='ios' ? <KeyboardSpacer /> : null }
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
    paddingLeft: 6,
    flexDirection: 'row'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelTitleContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 6
  },
  headerTitle: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.6)'
  },
  textInput: {
    flex: 1,
    minHeight: 60,
    maxHeight: 120,
    fontSize: 16,
    fontFamily: 'Open Sans',
    padding: 10
  }
});
