import React, {Component} from 'react';
import {
  ListView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import ChannelListItemView from './channel-list-item-view';

export default class ChannelListView extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.channels)

    return (
      <ListView
        style={[styles.container, this.props.style]}
        dataSource={dataSource}
        enableEmptySections={true}
        refreshControl={this.props.refreshControl}
        renderRow={(channel, sectionID, rowID, highlightRow) => {
          return (
            <ChannelListItemView
              channel={channel}
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
