// Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Este es el encabezado</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Header;