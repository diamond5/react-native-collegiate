import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  PixelRatio
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

export default class EventListItemView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  _renderActivityIndicator() {
    return (
      <ActivityIndicator
        animating={true}
        style={styles.activityIndicator}
        size={'large'}
      />
    )
  }

  render() {
    var event = this.props.event

    return (
      <TouchableOpacity
        style={styles.container} onPress={() => this.props.onPress && this.props.onPress(event)}>
        <View style={styles.contentContainer}>
          <View style={styles.columnOne}>
            <Text style={styles.columnOneText}>{moment(event.occurs_at).format('MM/DD/YY')}</Text>
            <Text style={styles.columnOneText}>{moment(event.occurs_at).format('h:mm a')}</Text>
          </View>
          <View style={styles.columnSeperator}></View>
          <View style={styles.columnMiddle}>
            <Text style={styles.columnMiddleTextPrimary}>{event.name}</Text>
            <View style={{flex: 1}}></View>
            <Text style={styles.columnMiddleTextSecondary}>{event.venue_name}</Text>
          </View>
          <View style={styles.columnLast}>
            {
              event.checked_in_at ? <Image source={require('../../../../img/icons/checkedin-small.png')}/>
              : <Image source={require('../../../../img/icons/checkin-small.png')}/>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 12
  },
  columnOne: {
    paddingRight: 8,
    justifyContent: 'center'
  },
  columnOneText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.7)',
    textAlign: 'right'
  },
  columnSeperator: {
    width: 1 / PixelRatio.get(),
    backgroundColor: '#000000'
  },
  columnMiddle: {
    flex: 1,
    paddingLeft: 8,
  },
  columnMiddleTextPrimary: {
    fontSize: 18,
    fontFamily: 'Open Sans',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  columnMiddleTextSecondary: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  columnLast: {
    justifyContent: 'center'
  }
})
