import React, {Component} from 'react';
import {
  ListView,
  StyleSheet
} from 'react-native';
import ExpenseListItemView from './expense-list-item-view';

export default class ExpenseListView extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.expenses)

    return (
      <ListView
        style={[styles.container, this.props.style]}
        dataSource={dataSource}
        enableEmptySections={true}
        refreshControl={this.props.refreshControl}
        renderRow={(expense, sectionID, rowID, highlightRow) => {
          return (
            <ExpenseListItemView
              expense={expense}
              onPress={this.props.onItemPress} />
          )
        }}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
