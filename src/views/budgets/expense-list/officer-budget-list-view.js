import React, {Component} from 'react';
import {
  ListView,
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';
import OfficerBudgetListItemView from './officer-budget-list-item-view';
import OfficerBudgetListHeader from './officer-budget-list-header';
import _ from 'lodash';

export default class OfficerBudgetListView extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.expenses)
    var totalSpent = _.reduce(this.props.expenses, (sum, expense) => {return expense.amount + sum}, 0)

    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}
          refreshControl={this.props.refreshControl}>
          <OfficerBudgetListHeader />
          <ListView
            style={[styles.container, this.props.style]}
            dataSource={dataSource}
            enableEmptySections={true}

            renderRow={(expense, sectionID, rowID, highlightRow) => {
              return (
                <OfficerBudgetListItemView
                  expense={expense}
                  onPress={this.props.onItemPress} />
              )
            }}
            />
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <View style={styles.textContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                TOTAL SPENT
              </Text>
            </View>
            <View style={styles.budgetValueContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                ${totalSpent.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.rowSeparator}></View>
          <View style={[styles.footerRow, {backgroundColor: '#bde7d2'}]}>
            <View style={styles.textContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                REMAINING IN BUDGET
              </Text>
            </View>
            <View style={styles.budgetValueContainer}>
              <Text style={styles.textPrimary}
                numberOfLines={1}>
                ${this.props.budget.remaining.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footerRow: {
    height: 40,
    flexDirection: 'row',
    paddingRight: 10
  },
  rowSeparator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
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
});
