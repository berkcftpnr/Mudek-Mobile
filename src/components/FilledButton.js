import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export function FilledButton({title, style, onPress}) {
  return (

      <TouchableOpacity style= {[styles.container, style]} onPress={onPress}>
        <Text style={styles.text} >{title.toUpperCase()}</Text>    
      </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16394e',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

