import React, {Component} from 'react';
import {
  ListView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import MessageListItemView from './message-list-item-view';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

export default class MessageListView extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.messages)

    return (
      <ListView
        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
        ref={listView => this.listView = listView}
        automaticallyAdjustContentInsets={false}
        style={[styles.container, this.props.style]}
        dataSource={dataSource}
        enableEmptySections={true}
        refreshControl={this.props.refreshControl}
        renderRow={(message, sectionID, rowID, highlightRow) => {
          return (
            <MessageListItemView
              message={message}
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
