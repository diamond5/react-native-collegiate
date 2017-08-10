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
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import ChannelListView from './channel-list-view';
import ChannelDataService from '../../../services/channel-data-service';

export default class ChannelListScreen extends Component {
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
        id: 'channel_list_screen_home'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      loading: true,
      refreshing: false
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this._getChannels()
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'channel_list_screen_home') {
        this.props.navigator.pop()
      }
    }
  }

  _refreshChannels() {
    this.setState({
      refreshing: true
    })

    this._getChannels()
  }

  _getChannels() {
    ChannelDataService.getList().then((channels) => {
      this.setState({
        loading: false,
        refreshing: false,
        channels,
      })
    }).catch((error) => {
      this.setState({
        loading: false,
        refreshing: false
      })
    })
  }

  _navigateToChannelShowScreen = (channel) => {
    this.props.navigator.push({
      screen: 'ChannelShowScreen',
      title: 'Channels',
      passProps: {
        channel: channel
      }
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
        <ChannelListView
          style={{flex: 1}}
          channels={this.state.channels}
          onItemPress={this._navigateToChannelShowScreen}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._refreshChannels.bind(this)}
            />
          }
        />
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
  }
});
