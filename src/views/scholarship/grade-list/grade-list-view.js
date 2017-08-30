import React, {Component} from 'react';
import {
  ListView,
  StyleSheet
} from 'react-native';
import GradeListItemView from './grade-list-item-view';

export default class GradeListView extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.grades)

    return (
      <ListView
        style={[styles.container, this.props.style]}
        dataSource={dataSource}
        enableEmptySections={true}
        refreshControl={this.props.refreshControl}
        renderRow={(grade, sectionID, rowID, highlightRow) => {
          return (
            <GradeListItemView
              grade={grade}
              onPress={this.props.onItemPress}
              onButtonFirstPress={this.props.onItemButtonFirstPress}
              onCheckBoxPress={this.props.onItemCheckBoxPress}/>
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
