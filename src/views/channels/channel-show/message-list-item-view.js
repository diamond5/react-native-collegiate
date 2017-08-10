import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import moment from 'moment';

export default class MessageListItemView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  render() {
    var message = this.props.message

    return (
      <View style={styles.container}>
        <View style={[styles.marginContainer, { flexDirection: message.from_user_id == AppState.currentUser.id ? 'row' : 'row-reverse' }]}>
          <View style={styles.imageColumn}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: message.user.image}}/>
            </View>
          </View>
          <View style={[styles.textContainer, {alignItems: message.from_user_id == AppState.currentUser.id ? 'flex-start' : 'flex-end'}]}>
            { message.from_user_id == AppState.currentUser.id ? null : <Text style={styles.usernameText}>{message.user.first_name + ' ' + message.user.last_name}</Text>}
            <View style={styles.textBackground}>
              <Text style={styles.textPrimary}>
                {message.message}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  marginContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10
  },
  imageColumn: {
    justifyContent: 'center'
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00bcd8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  usernameText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'transparent',
    marginBottom: 3
  },
  textBackground: {
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  textPrimary: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)',
    backgroundColor: 'transparent'
  },
  iconContainer: {
    justifyContent: 'center'
  }
})
