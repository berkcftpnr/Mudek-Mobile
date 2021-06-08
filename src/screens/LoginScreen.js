import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View , Alert, AsyncStorage ,Image  } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { API} from '../config/config';
import ANKU_logo from '../images/ANKU_logo.png';
import MUDEK_logo from '../images/MUDEK.png';

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

    AsyncStorage.setItem("name",response.data[0].name_m)
    AsyncStorage.setItem("id",response.data[0].user_id.toString())
    AsyncStorage.setItem("level",response.data[0].authlevel_m.toString())


    switch (response.data[0].authlevel_m) {
         case 0:
                 navigation.navigate('Mudek');//window.location.href = 'admin/';
                 break;
             case 1:
                 navigation.navigate('Instructor');//
                 break;
             case 2:
                 navigation.navigate('Asistant');
                 break;
             case 3:
                 navigation.navigate('Mudek');//mudek
                 break;
             case 4:
                 navigation.navigate('Pending');//window.location.href = 'pending/';
                 break;
             case 5:
                 navigation.navigate('Pending');//window.location.href = 'pending/';
                 break;
             case 6:
                 navigation.navigate('Pending');//window.location.href = 'pending/';
                 break;
             case 7:
                 navigation.navigate('Pending2');//window.location.href = 'pending2/';
                 break;
             default:
             alert("MÜDEK sistemini kullanmak için gerekli izne sahip değilsiniz");



}
  }
})

}


  return (
    <View style={styles.container}>
    <View style={styles.rowContainer}>
    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
      <Image style={styles.MUDEK_logo}
            source={MUDEK_logo}
        />
      </View>
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
      <TextButton title={'Şifremi Unuttum'}
      onPress ={() => {
        navigation.navigate('SifremiUnuttum');
      }}
      />


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
    paddingTop: 60,
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

  },ANKU_logo: {
    alignContent:'flex-start',
    height:50,
    width:50,
    marginHorizontal: 5,
  },
  MUDEK_logo: {
    alignContent:'flex-end',
    height:50,
    width:150,
    marginHorizontal: 5,
  },

  rowContainer: {
      flexDirection: 'row',
      margin: 5,
  },

});
