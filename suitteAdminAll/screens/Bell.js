// Bell.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bell = () => {
    return (
        <View style={styles.contenido}>
          <Text>Te amo mucho</Text>
        </View>
      );
};

const styles = StyleSheet.create({
    contenido: {
      padding: 20,
    },
  });

export default Bell;
