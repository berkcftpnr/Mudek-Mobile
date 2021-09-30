import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View , Alert, AsyncStorage ,Image , Picker, ScrollView } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { IconButton } from '../components/IconButton';
import { Error } from '../components/Error';
import { API} from '../config/config';
import ANKU_logo from '../images/ANKU_logo.png';
import MUDEK_logo from '../images/MUDEK.png';
import * as DocumentPicker from 'expo-document-picker';

export function SinavDocEkle({navigation}) {
    const[lecDetId,setLecDecId]= useState("");

    const [selectedValueTur, setSelectedValueTur] = useState("Sınav Soruları");
    const [selectedValueDerece, setSelectedValueDerece] = useState("Yüksek");
    const[documan,setDocuman]=useState("");

    const [aciklama, setAciklama] = useState("");
    const [baslik, setBaslik] = useState("");
    React.useEffect(() => {
      AsyncStorage.getItem('lecDetId').then((value)=>{
        setLecDecId(value)

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
let { data } = await API.post('/api/examdocs/single-upload', formData, {
  onUploadProgress: ({ loaded, total }) => {
      let progress = ((loaded / total) * 100).toFixed(2);
    //  setProgress(progress);
  }
});

//setUplodedImg(data.imagePath);

    API.post("/api/instructor/examDocEkle",{

    lectureDetId:lecDetId,
    path: data.docPath,
    name:baslik,
    examRank:selectedValueDerece,
    examType:selectedValueTur,
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
      navigation.navigate('Instructor');
      navigation.navigate('Lecture');//sessionlar eklenecek
}}/>

    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
      <View style={styles.lineStyle}>
      </View>
          <Heading style= {styles.title} >Sınav Dökümanı Ekleyiniz</Heading>
          <View style={styles.lineStyle}>
          </View>
          <ScrollView style= {styles.scrollView}>
          <Input style={styles.input}
          placeholder={'Başlık'}
          maxLength={15}
          onChangeText={text => setBaslik(text)}
          />

          <Text style={styles.araBaslik}>Sınav Türü Seçiniz</Text>
          <View style={styles.lineStyle}>
          </View>
          <Picker style={styles.rol_secimi}
            selectedValue={selectedValueTur}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValueTur(itemValue)}
          >
            <Picker.Item label="Sınav Soruları" value="1" />
            <Picker.Item label="Cevap Anahtarı" value="2" />
            <Picker.Item label="1. Vize" value="3" />
            <Picker.Item label="2. Vize" value="4" />
            <Picker.Item label="Final" value="5" />
          </Picker>
          <View style={styles.lineStyle}>
          </View>
          <Text style={styles.araBaslik}>Sınav Derecesi Seçiniz</Text>
          <View style={styles.lineStyle}>
          </View>
          <Picker style={styles.rol_secimi}
            selectedValue={selectedValueDerece}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValueDerece(itemValue)}
          >
            <Picker.Item label="En Yüksek" value="1" />
            <Picker.Item label="Orta" value="2" />
            <Picker.Item label="En Düşük" value="3" />
          </Picker>
          <View style={styles.lineStyle}>
          </View>

          <Input style={styles.input}
          multiline = {true}
          numberOfLines = {4}
          placeholder={'Açıklama'}
          maxLength={500}
          onChangeText={text => setAciklama(text)}
          />
          <FilledButton title={'Döküman Seç'}
          style={styles.ekleButton}
          onPress ={sec}
          />
          <FilledButton title={'Ekle'}
          style={styles.secButton}
          onPress ={ekle}
          />
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
      marginHorizontal: 122,
      width:'26%'

  },closeIcon: {
    position: 'absolute',
    top: 60,
    right: 20,

},
    araBaslik: {
      marginHorizontal: 8,
      fontSize: 20,
      marginVertical: 8,
  },
    lineStyle:{
          borderWidth: 0.5,
          borderColor:'#16394e',
          margin:10,
          width: '100%',
     },

     scrollView: {
       paddingTop: 10,
       padding:20,
       backgroundColor: '#fff',
       width: '100%',
     },

});
