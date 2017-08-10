import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';

export default class ChannelListItemView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  render() {
    var channel = this.props.channel

    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(channel)}>
          <View style={styles.marginContainer}>
            <View style={styles.imageColumn}>
              <View style={styles.imageContainer}>
                <Image source={require('../../../../img/icons/channel.png')}/>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                {channel.name}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <Image source={require('../../../../img/icons/chevron-small.png')}/>
            </View>
          </View>
        </TouchableOpacity>
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
    borderBottomColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
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
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  textPrimary: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  iconContainer: {
    justifyContent: 'center'
  }
})
