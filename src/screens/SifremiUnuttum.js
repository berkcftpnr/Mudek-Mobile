import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect}  from 'react';
import { StyleSheet, Text, View, ScrollView ,Image, Picker } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { IconButton } from '../components/IconButton';
import ANKU_logo from '../images/ANKU_logo.png';
import MUDEK_logo from '../images/MUDEK.png';
import { API} from '../config/config';

export function SifremiUnuttum({navigation}) {

return (
  <View style={styles.container}>

  <IconButton style={styles.closeIcon} name={'close-circle-outline'} onPress ={() => {
    navigation.navigate('Login');
  }}/>

<View style={styles.rowContainer}>

  <Image style={styles.ANKU_logo}
        source={ANKU_logo}
    />
    <Image style={styles.MUDEK_logo}
          source={MUDEK_logo}
      />

  </View>
  <Heading style= {styles.title} >Şifremi Unuttum</Heading>
  <Text style={styles.aciklama}>Lütfen size yardımcı olabilmemiz için bizimle iletişime geçin veya parolasını değiştirmek istediğiniz kayıtlı e-mail adresinizi girin.</Text>
    <ScrollView style={styles.scrollView} >

    <Input style={styles.input}
    placeholder={'E-mail'}
    keyboardType= "email-address"
    />
    <FilledButton title={'Gönder'}
    style={styles.registerButton}
    onPress ={() => {}}
    />
    <FilledButton title={'İletişim'}
    style={styles.registerButton}
    onPress ={() => {
      navigation.navigate('Contact');
    }}
    />

    <StatusBar style="auto" />
</ScrollView >
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 0,
  backgroundColor: '#fff',
  alignItems: 'center',
  paddingTop: 60,
  paddingBottom: 0,

},
title: {
  marginBottom: 0,
},

aciklama: {
  margin: 5,
  textAlign: 'center',
},

input: {
    marginVertical: 8,
},
loginButton: {
    marginVertical: 20,
},
registerButton: {
    marginVertical: 0,
    marginBottom:10
},
closeIcon: {
  position: 'absolute',
  top: 60,
  right: 20,


},
scrollView: {
  padding:20,
  backgroundColor: '#fff',
  width: '100%',

},
ANKU_logo: {
  alignContent:'flex-start',
  height:50,
  width:50,
  marginHorizontal:5,
},
MUDEK_logo: {
  alignContent:'flex-end',
  height:50,
  width:150,
  marginHorizontal:5,
},
rol_secimi: {
  marginVertical:8,
},

rowContainer: {
    flexDirection: 'row',
    margin: 5,
},

});
