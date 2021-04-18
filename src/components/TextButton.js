import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export function TextButton({title, style, onPress}) {
  return (

      <TouchableOpacity style= {[styles.container, style]} onPress={onPress}>
        <Text style={styles.text} >{title.toUpperCase()}</Text>    
      </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    color: '#16394e',
    fontWeight: '500',
    fontSize: 14,
  },
});

