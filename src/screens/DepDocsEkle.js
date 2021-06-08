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
export function DepDocsEkle({navigation}) {
    const[userId,setUserId]= useState("");
    const[donem,setDonem]=useState("");
    const[donemler,setDonemler]=useState([]);
      const[documan,setDocuman]=useState("");

    const [aciklama, setAciklama] = useState("");
    const [baslik, setBaslik] = useState("");
    React.useEffect(() => {
      AsyncStorage.getItem('id').then((value)=>{
        setUserId(value)

      })

          AsyncStorage.getItem('donemId').then((value)=>{
            setDonem(value)

          })

          setDocuman(undefined)

  }, []);

  const sec =async ()=>{


  const doc=await DocumentPicker.getDocumentAsync()

  let lastIndex = doc.name.lastIndexOf(".");
  // get the original extension of the file
  let extension = doc.name.substring(lastIndex);
  if(extension===".pdf")
  {setDocuman(doc)}
  else{
  setDocuman(undefined)

  }

  console.log(doc,"  ",doc.name.length,"  ",extension)
  }

    const ekle =async ()=>{

    let formData = new FormData();
      if(documan!=undefined ){
        var doc = {
  uri: documan.uri,
  type: 'document/pdf',
  name: 'documan.pdf',
  };
   formData.append('file', doc);

  //  setUploding(true);
  let { data } = await API.post('/api/depdocs/single-upload', formData, {
    onUploadProgress: ({ loaded, total }) => {
        let progress = ((loaded / total) * 100).toFixed(2);
      //  setProgress(progress);
    }
  });

  //setUplodedImg(data.imagePath);

  API.post("/api/asistan/docEkle",{

  userId:userId,
  path: data.docPath,
  donem:donem,
  name:baslik,
  explanation:aciklama,
  }).then((response)=>{
  if(response.data.message){
    alert(response.data.message)
  }})

  //setUploding(false);

  setDocuman(undefined)
  }else{
  alert("Evrak Seçiniz")
  }


    }




  return (
    <View style={styles.container}>
    <IconButton style={styles.closeIcon} name={'close-circle-outline'} onPress ={() => {
      navigation.navigate('Asistant');
      navigation.navigate('DepDocs');//sessionlar eklenecek
}}/>

    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
      <View style={styles.lineStyle}>
      </View>
          <Heading style= {styles.title} >Bölüm Evrağı Ekleyiniz</Heading>
          <View style={styles.lineStyle}>
          </View>
          <Input style={styles.input}
          placeholder={'Başlık'}
          maxLength={15}
          onChangeText={text => setBaslik(text)}
          />

          <Input style={styles.input}
          multiline = {true}
          numberOfLines = {4}
          placeholder={'Açıklama'}
          maxLength={500}
          onChangeText={text => setAciklama(text)}
          />
          <View style={styles.lineStyle}>
          </View>
          <FilledButton title={'Seç'}
          style={styles.secButton}
          onPress ={sec}
          />
          <FilledButton title={'Ekle'}
          style={styles.ekleButton}
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
