import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';
import Format from '../../../helpers/format';

export default class GradeModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        >
        <View
          style={[this.props.style]}
          >
          <View style={styles.contentContainer}>
            <Image style={styles.image}
              resizeMode="contain"
              source={{uri: Format.imageUrl(this.props.image)}}/>
          </View>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={this.props.onClosePressed}>
              <Text style={styles.closeButtonText}>{'Close'}</Text>
          </TouchableOpacity>
       </View>
     </Modal>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'transparent',
    marginLeft: 9,
    marginTop: 9,
    marginRight: 9,
    flex: 1,
    borderRadius: 12,
    padding: 8
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    backgroundColor: '#000000'
  },
  closeButtonText: {
    color:"#000000",
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
    fontSize: 20,
  },
  closeButtonContainer: {
    margin: 9,
    height: 57,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  }
});
