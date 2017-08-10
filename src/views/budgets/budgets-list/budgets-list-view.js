import React, {Component} from 'react';
import {
  ListView,
  StyleSheet
} from 'react-native';
import BudgetsListItemView from './budgets-list-item-view';

export default class BudgetsListView extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.budgetsList)

    return (
      <ListView
        style={[styles.container, this.props.style]}
        dataSource={dataSource}
        enableEmptySections={true}
        refreshControl={this.props.refreshControl}
        renderRow={(budget, sectionID, rowID, highlightRow) => {
          return (
            <BudgetsListItemView
              budget={budget}
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
