import React, {Component} from 'react';
import {
  ListView,
  StyleSheet
} from 'react-native';
import EventListItemView from './event-list-item-view';

export default class EventListView extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.events)

    return (
      <ListView
        style={[styles.container, this.props.style]}
        dataSource={dataSource}
        enableEmptySections={true}
        refreshControl={this.props.refreshControl}
        renderRow={(event, sectionID, rowID, highlightRow) => {
          return (
            <EventListItemView
              event={event}
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
