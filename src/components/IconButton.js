import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  TouchableOpacity } from 'react-native';
//import Icon from 'react-native-ionicons';
import Icon from 'react-native-vector-icons/Ionicons';


export function IconButton({name, style, onPress}) {
  return (

      <TouchableOpacity style= {[styles.container, style]} onPress={onPress}>
        <Icon name = {name} color={'#16394e'} />

      </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  container: { },
});
