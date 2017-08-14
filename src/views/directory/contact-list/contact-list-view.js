import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AlphabetListView from 'react-native-alphabetlistview';
import ContactListItemView from './contact-list-item-view';

class SectionHeader extends Component {
  render() {
    return (
      <View style={{
        backgroundColor: '#e2e4e5',
        paddingLeft: 10,
        justifyContent: 'center',
        height: 22.5,
        marginRight: 30
      }}>
        <Text style={{
          color:'rgba(0, 0, 0, 0.6)',
          fontWeight:'500',
          fontFamily: 'Open Sans',
          fontSize:12,
          lineHeight:12
        }}>{this.props.title}</Text>
      </View>
    );
  }
}

class SectionItem extends Component {
  render() {
    return (
      <Text style={{color:'#000', fontSize: 14, fontFamily: 'Open Sans', color: 'rgba(0, 0, 0, 0.6)'}}>{this.props.title}</Text>
    );
  }
}

export default class ContactListView extends Component {
  render() {
    return (
      <AlphabetListView
        enableEmptySections={true}
        style={{flex: 1}}
        sectionListStyle={{backgroundColor: '#FFFFFF', width: 30}}
        data={this.props.users}
        cell={ContactListItemView}
        cellHeight={60}
        sectionListItem={SectionItem}
        sectionHeader={SectionHeader}
        sectionHeaderHeight={22.5}
        cellProps={{onItemPress: this.props.onItemPress}}
      />
    )
  }
}
