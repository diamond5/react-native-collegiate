import React, {Component} from 'react';
import {
  ListView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import MinutesListItemView from './minutes-list-item-view';

export default class MinutesListView extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.minutesList)

    return (
      <ListView
        style={[styles.container, this.props.style]}
        dataSource={this.ds.cloneWithRowsAndSections(this.props.minutesList)}
        enableEmptySections={true}
        refreshControl={this.props.refreshControl}
        renderRow={(minutes, sectionID, rowID, highlightRow) => {
          return (
            <MinutesListItemView
              minutes={minutes}
              onPress={this.props.onItemPress} />
          )
        }}
        renderSectionHeader={(sectionData, category) => {
          return (
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderTitle}>Week of {category}</Text>
              </View>
            </View>
          )
        }}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionHeader: {
    height: 30,
    backgroundColor: '#e2e4e5',
    justifyContent: 'center',
    paddingLeft: 6
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.7)'
  },
});
