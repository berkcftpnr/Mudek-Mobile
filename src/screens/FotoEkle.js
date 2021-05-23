import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View , Alert, AsyncStorage ,Image , Picker ,PermissionsAndroid} from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { IconButton } from '../components/IconButton';
import { Error } from '../components/Error';
import { API} from '../config/config';
import ANKU_logo from '../images/ANKU_logo.png';
import MUDEK_logo from '../images/MUDEK.png';
//import DocumentPicker from 'react-native-document-picker';
import * as DocumentPicker from 'expo-document-picker';

export function FotoEkle({navigation}) {
    const[kullanıcıAdi,setKullaniciAdi]= useState("");
    const[seciliDonem,setSeciliDonem]= useState("");
    const[donemler,setDonemler]=useState([]);
    const[foto,setFoto]=useState("https://yazi-yorums.herokuapp.com/photos/fotograf1.jpg");

    React.useEffect(() => {

    AsyncStorage.getItem('name').then((value)=>{
      setKullaniciAdi(value)

    })

    API.get("/api/donemGoruntule").then((response) => {
    setDonemler( response.data );

});

  }, []);

  const permission = async () => {
try {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
      title: "depolama izni",
      message:
        "Cool Photo App needs access to your camera " +
        "so you can take awesome pictures.",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("You can use the camera");
  } else {
    console.log("Camera permission denied");
  }
} catch (err) {
  console.warn(err);
}
};





    const ekle =async ()=>{
/*
      let result = await DocumentPicker.getDocumentAsync.getDocumentAsync({});
  		  alert(result.uri);
        console.log(result);

*/

  const doc=await DocumentPicker.getDocumentAsync()

setFoto(doc)
  console.log(foto)
    }



  return (
    <View style={styles.container}>
    <IconButton style={styles.closeIcon} name={'close-circle-outline'} onPress ={() => {
      navigation.navigate('Login');//sessionlar eklenecek
}}/>

    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
      <View style={styles.lineStyle}>
      </View>
          <Heading style= {styles.title} >Fotoğraf Ekleyiniz</Heading>
          <View style={styles.lineStyle}>
          </View>
          <Input style={styles.input}
          placeholder={'Başlık'}
          />

          <Input style={styles.input}
          multiline = {true}
          numberOfLines = {4}
          placeholder={'Açıklama'}
          />
          <Image style={styles.ANKU_logo2}
                  source={foto}
              />
          <View style={styles.lineStyle}>
          </View>
          <FilledButton title={'Ekle'}
          style={styles.secButton}
          onPress ={ekle}
          />
          <FilledButton title={'Seç'}
          style={styles.secButton}
          onPress ={() => {
            navigation.navigate('DepDocs');
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
    marginBottom: 30,
      marginTop:30,
    textAlign:'center',
  },
  input: {
      marginVertical: 8,
  },ANKU_logo: {
    alignContent:'flex-start',
    height:50,
    width:50
  },rol_secimi: {
    marginVertical:18,

  },
  secButton: {
      marginVertical: 20,
      width:'22%'

  },closeIcon: {
    position: 'absolute',
    top: 60,
    right: 20,


  },
    lineStyle:{
          borderWidth: 0.5,
          borderColor:'#16394e',
          margin:10,
          width: '100%',
     },
     ANKU_logo2: {
width: 40, height: 40
     }

});
