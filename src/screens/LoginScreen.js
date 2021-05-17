import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View , Alert, AsyncStorage  } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { API} from '../config/config';

export function LoginScreen({navigation}) {
  const[email,setEmail]= useState("");
  const[sifre,setSifre]= useState("");
  const girisYap =()=> {
    API.post("/api/giris",{

  eMail:email,
  password:sifre,

}).then((response)=>{
  if(response.data.message){
    alert(response.data.message);
  }else{
alert(response.data[0].name_m);
AsyncStorage.setItem('name', response.data[0].name_m);
  }
})

}


  return (
    <View style={styles.container}>
      <Heading style= {styles.title} >Giriş Yap</Heading>
      <Error error={''} />
      <Input style={styles.input}
      placeholder={'Email'}
      keyboardType= "email-address"
      onChangeText={text => setEmail(text)}
      />
      <Input style={styles.input}
      placeholder={'Şifre'}
      secureTextEntry
      onChangeText={text => setSifre(text)}
      />
      <FilledButton title={'Giriş Yap'}
      style={styles.loginButton}
      onPress ={ girisYap}
      />
      <FilledButton title={'Üye Ol'}
      style={styles.registerButton}
      onPress ={() => {
        navigation.navigate('Registration');
      }}
      />
      <TextButton title={'Şifremi Unuttum'} onPress={() => {}} />


      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 120,
  },
  title: {
    marginBottom: 48,
  },
  input: {
      marginVertical: 8,
  },
  loginButton: {
      marginVertical: 20,
  },
  registerButton: {
      marginVertical: 0,

  }

});
