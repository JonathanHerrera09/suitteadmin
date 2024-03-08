// Footer.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = ({ onContentChange, selectedContent }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => onContentChange('HomeScreen')}>
        <Icon name="home" size={24} color={selectedContent === 'HomeScreen' ? 'black' : '#fff'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onContentChange('Add')}>
        <Icon name="plus" size={24} color={selectedContent === 'Add' ? 'black' : '#fff'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onContentChange('Bell')}>
        <Icon name="bell" size={24} color={selectedContent === 'Bell' ? 'black' : '#fff'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onContentChange('Delivery')}>
        <Icon name="truck" size={24} color={selectedContent === 'Delivery' ? 'black' : '#fff'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'red',
    padding: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Footer;
