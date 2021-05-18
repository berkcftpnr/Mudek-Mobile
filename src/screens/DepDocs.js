import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, ScrollView, Text, View , Alert, AsyncStorage ,Image , Picker } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';

import { Error } from '../components/Error';

import ANKU_logo from '../images/ANKU_logo.png';
import MUDEK_logo from '../images/MUDEK.png';

export function DepDocs({navigation}) {




  return (
    <View style={styles.container}>
    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
      <View style={styles.lineStyle}>
      </View>

      <ScrollView style= {styles.scrollView}>
          <Heading style= {styles.title} >  Bölüm Evrakları </Heading>

          <View style={styles.lineStyle}>
          </View>

      <View style={styles.containerAcikmavi}>
      <View style={styles.containerKoyumavi}>
      </View>
      </View>

      <Heading style= {styles.title} >  Fotoğraflar </Heading>


      <View style={styles.lineStyle}>
      </View>

      <View style={styles.containerAcikmavi}>
      <View style={styles.containerKoyumavi}>
      </View>
      </View>

      <StatusBar style="auto" />
      </ScrollView>

    </View>




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    marginBottom: 48,
  },
ANKU_logo: {
    alignContent:'flex-start',
    height:50,
    width:50
  },

  containerAcikmavi: {
    flex: 1,
    padding: 20,
    backgroundColor: '#8cb8ff',
    alignItems: 'center',
    paddingTop: 60,
    width: '100%',
    borderWidth: 1,

  },

  containerKoyumavi: {
    flex: 1,
    padding: 20,
    backgroundColor: '#16394e',
    alignItems: 'center',
    paddingTop: 60,
    width: '100%',

  },

  lineStyle:{
        borderWidth: 0.5,
        borderColor:'#16394e',
        margin:10,
        width: '100%',
   },

   scrollView: {
     padding:20,
     backgroundColor: '#fff',
     width: '100%',

   },


});
