import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View , Alert, AsyncStorage ,Image , Picker } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { IconButton } from '../components/IconButton';
import { Error } from '../components/Error';
import { API} from '../config/config';
import ANKU_logo from '../images/ANKU_logo.png';
import MUDEK_logo from '../images/MUDEK.png';
import * as DocumentPicker from 'expo-document-picker';
export function KazanimEkle({navigation}) {
    const[lecDetId,setLecDecId]= useState("");


    const [aciklama, setAciklama] = useState("");
    const [baslik, setBaslik] = useState("Sınav Soruları");
    React.useEffect(() => {
      AsyncStorage.getItem('lecDetId').then((value)=>{
        setLecDecId(value)

      })




  }, []);



    const ekle =async ()=>{


  API.post("/api/instructor/kazanimEkle",{

  lectureDetId:lecDetId,
  type:baslik,
  explanation:aciklama,
  }).then((response)=>{
  if(response.data.message){
    alert(response.data.message)
  }})

  //setUploding(false);




    }




  return (
    <View style={styles.container}>
    <IconButton style={styles.closeIcon} name={'close-circle-outline'} onPress ={() => {
      navigation.navigate('Instructor');
      navigation.navigate('Lecture');//sessionlar eklenecek
}}/>

    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
      <View style={styles.lineStyle}>
      </View>
          <Heading style= {styles.title} >Ders Öğrenme Kazanımı Ekleyiniz</Heading>
          <View style={styles.lineStyle}>
          </View>
          <Picker style={styles.rol_secimi}
            selectedValue={baslik}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => setBaslik(itemValue)}
          >
            <Picker.Item label="Sınav Soruları" value="Sınav Soruları" />
            <Picker.Item label="Cevap Anahtarı" value="Cevap Anahtarı" />
            <Picker.Item label="1. Vize" value="1. Vize" />
            <Picker.Item label="2. Vize" value="2. Vize" />
            <Picker.Item label="Final" value="Final" />
          </Picker>

          <Input style={styles.input}
          multiline = {true}
          numberOfLines = {4}
          placeholder={'Açıklama'}
          maxLength={500}
          onChangeText={text => setAciklama(text)}
          />
          <View style={styles.lineStyle}>
          </View>
          <FilledButton title={'Ekle'}
          style={styles.secButton}
          onPress ={ekle}
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


});
