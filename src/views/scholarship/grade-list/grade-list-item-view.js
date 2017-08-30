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

export default class GradeListItemView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  render() {
    var grade = this.props.grade

    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(grade)}>
          <View style={styles.marginContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                {grade.course}
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
    height: 30,
  },
  marginContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    paddingRight: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  textPrimary: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  iconContainer: {
    justifyContent: 'center'
  }
})
