import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class OfficerBudgetListHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.textPrimary}
            numberOfLines={1}>
            ITEM
          </Text>
        </View>
        <View style={styles.budgetValueContainer}>
          <Text style={styles.textPrimary}
            numberOfLines={1}>
            COST
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
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
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  budgetValueContainer: {
    justifyContent: 'center'
  },
  budgetValueContainer: {
    justifyContent: 'center'
  }
})
