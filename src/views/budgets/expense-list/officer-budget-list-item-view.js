import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class OfficerBudgetListItemView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  render() {
    var expense = this.props.expense

    return (
      <View>
        <View style={styles.container} onPress={() => this.props.onPress(expense)}>
          <View style={styles.marginContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                {expense.notes}
              </Text>
            </View>
            <View style={styles.budgetValueContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                ${Number(expense.amount).toFixed(2)}
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
    height: 40,
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
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  textSecondary: {
    fontSize: 13,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  budgetValueContainer: {
    justifyContent: 'center'
  },
  budgetValueContainer: {
    justifyContent: 'center'
  }
})
