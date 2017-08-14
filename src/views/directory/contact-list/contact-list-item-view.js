import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import Communications from 'react-native-communications';

export default class ContactListItemView extends Component {
  _callUser = () => {
    let user = this.props.item

    if (user.cellphone)
      Communications.phonecall(user.cellphone, true)
  }

  _sendMessage = () => {
    let user = this.props.item

    if (user.cellphone)
      Linking.openURL('sms:' + user.cellphone);
  }

  render() {
    let user = this.props.item

    return (
      <View style={[styles.container, { borderBottomWidth: this.props.isLast ? 0 : 1}]}>
        <View style={styles.column}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: user.image}} />
          </View>
        </View>
        <TouchableOpacity onPress={() => this.props.onItemPress(user)} style={styles.columnFlex}>
          <Text style={styles.title}>{user.first_name + ' ' + user.last_name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._callUser}
          style={styles.column}>
          <Image source={require('../../../../img/icons/call.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._sendMessage}
          style={styles.column}>
          <Image source={require('../../../../img/icons/message.png')}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 30,
    height:60,
    flexDirection: 'row',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)'
  },
  column: {
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#3bb878',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 19
  },
  columnFlex: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)'
  }
})
