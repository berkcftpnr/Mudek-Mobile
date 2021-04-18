import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Heading({children, style, ...props}) {
  return (
    <Text {...props} style={[styles.text, style]} >
        {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
      fontSize: 32,
      color: '#16394e',
  }

});
