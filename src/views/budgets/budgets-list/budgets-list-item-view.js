import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class BudgetsListItemView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  render() {
    var budget = this.props.budget
    // var date = moment(task.due_at)

    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(budget)}>
          <View style={styles.marginContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                {budget.name}
              </Text>
            </View>
            <View style={styles.budgetValueContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                ${budget.total}
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
  budgetValueContainer: {
    justifyContent: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    marginLeft: 6
  }
})
