import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View , Alert, AsyncStorage ,Image , Picker ,PermissionsAndroid,ScrollView} from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { IconButton } from '../components/IconButton';
import { Error } from '../components/Error';
import { API} from '../config/config';
import ANKU_logo from '../images/ANKU_logo.png';
import MUDEK_logo from '../images/MUDEK.png';
import Placeholder from '../images/placeholder.png';
//import DocumentPicker from 'react-native-document-picker';
import * as DocumentPicker from 'expo-document-picker';

export function FotoEkle({navigation}) {
    const[kullanıcıAdi,setKullaniciAdi]= useState("");
    const[seciliDonem,setSeciliDonem]= useState("");
    const[donemler,setDonemler]=useState([]);
    const[foto,setFoto]=useState("");

    const [isUploding, setUploding] = useState(false);
    const [uploadedImg, setUplodedImg] = useState("");
    const [uploadProgress, setProgress] = useState(0);

    React.useEffect(() => {

    AsyncStorage.getItem('name').then((value)=>{
      setKullaniciAdi(value)

    })

    API.get("/api/donemGoruntule").then((response) => {
    setDonemler( response.data );

    setFoto(Placeholder)
});


  }, []);







    const sec =async ()=>{


  const doc=await DocumentPicker.getDocumentAsync()
  setFoto(doc)
  let lastIndex = doc.name.lastIndexOf(".");
    // get the original extension of the file
  let extension = doc.name.substring(lastIndex);
  if(extension===".jpg" || extension===".jpeg" || extension ===".png")
  {setFoto(doc)}
  else{
    setFoto(Placeholder)

  }

console.log(doc,"  ",doc.name.length,"  ",extension)
    }

      const ekle =async ()=>{

      let formData = new FormData();
        if(foto!=undefined && foto!=Placeholder){
          var photo = {
    uri: foto.uri,
    type: 'image/jpeg',
    name: 'photo.jpg',
};
     formData.append('file', photo);

//  setUploding(true);
  let { data } = await API.post('/api/images/single-upload', formData, {
      onUploadProgress: ({ loaded, total }) => {
          let progress = ((loaded / total) * 100).toFixed(2);
        //  setProgress(progress);
      }
  });

    //setUplodedImg(data.imagePath);

    API.post("/api/asistan/fotoEkle",{

    userId:1,
    path: data.imagePath,
    donem:15,
    name:'deneme',
    explanation:'deneme exp'
  }).then((response)=>{
    if(response.data.message){
      alert(response.data.message)
    }})

    //setUploding(false);

  setFoto(Placeholder)
}else{
alert("Fotoğraf Seçiniz")
}


      }



  return (
    <View style={styles.container}>
    <IconButton style={styles.closeIcon} name={'close-circle-outline'} onPress ={() => {
      navigation.navigate('DepDocs');//sessionlar eklenecek
}}/>

    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
      <View style={styles.lineStyle}>
      </View>
          <Heading style= {styles.title} >Fotoğraf Ekleyiniz</Heading>
          <View style={styles.lineStyle}>
          </View>
          <ScrollView style={styles.scrollView} >
          <Input style={styles.input}
          placeholder={'Başlık'}
          />

          <Input style={styles.input}
          multiline = {true}
          numberOfLines = {4}
          placeholder={'Açıklama'}
          />
              <View style={styles.rowContainer}>
          <Image style={styles.selected_image}
                  source={foto}
              />


          <FilledButton title={'Seç'}
          style={styles.secButton}
          onPress ={sec}

          />
            </View>
          <FilledButton title={'Ekle'}
          style={styles.ekleButton}
          onPress ={ekle}
          />


      <StatusBar style="auto" />
      </ScrollView >
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
  },
  rol_secimi: {
    marginVertical:18,

  },
  secButton: {
      marginVertical: 40,
      width:'22%',
      marginHorizontal:20,
      height: 80,
      borderRadius:101

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
     selected_image: {
       width: 270, height: 170,
        marginHorizontal:0
},
rowContainer: {
    flexDirection: 'row',
    margin: 5,
},
ekleButton: {
      marginVertical: 20,
      width:'22%',
      marginHorizontal:150,


  },
  scrollView: {
    padding:20,
    backgroundColor: '#fff',
    width: '115%',

  },

});
