import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class ExpenseListItemView extends Component {
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
        <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(expense)}>
          <View style={styles.marginContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                {expense.notes}
              </Text>

              <Text style={styles.textSecondary}
                numberOfLines={1}>
                ${Number(expense.amount).toFixed(2)}
              </Text>

            </View>
            <View style={styles.iconContainer}>
              <Image source={require('../../../../img/icons/expense.png')}/>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
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
  iconContainer: {
    justifyContent: 'center',
    marginLeft: 6,
    marginRight: 15
  }
})
