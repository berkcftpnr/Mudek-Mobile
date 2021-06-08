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


export function FotoGoruntule({navigation}) {

    const[fotoSrc,setFotoSrc]=useState("http://192.168.1.23:4001/photos/placeholder.png");
    const[fotoId,setFotoId]=useState("");



    const [aciklama, setAciklama] = useState("");
    const [baslik, setBaslik] = useState("");
    React.useEffect(() => {

    AsyncStorage.getItem('fotoId').then((value)=>{


API.post("/api/asistan/fotoGoruntule2",{
    fotoId:value,

        }).then((response) => {

  setFotoSrc( response.data[0].path );
  setBaslik(response.data[0].doc_desc)
  setAciklama(response.data[0].explanation)
  setFotoId(value)
});


    })







  }, []);







    const sil = ()=>{

      API.post("/api/asistan/fotosil",{
          fotoId:fotoId,
      }).then((response)=>{
  navigation.navigate('Asistant');
  navigation.navigate('DepDocs');
        if(response.data.message){
          alert(response.data.message)
        }

      })


    }

    const indir = ()=>{

    }



      const guncelle = ()=>{
        API.post("/api/asistan/fotoguncelle",{
                fotoId:fotoId,
                desc:baslik,
                exp:aciklama
            }).then((response)=>{

              if(response.data.message){
                alert(response.data.message)
              }

            })



      }



  return (
    <View style={styles.container}>
    <IconButton style={styles.closeIcon} name={'close-circle-outline'} onPress ={() => {
      AsyncStorage.removeItem("fotoId")
      navigation.navigate('Asistant');
      navigation.navigate('DepDocs');//sessionlar eklenecek

}}/>

    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
      <View style={styles.lineStyle}>
      </View>
          <Heading style= {styles.title} >{baslik}</Heading>
          <View style={styles.lineStyle}>
          </View>
          <ScrollView style={styles.scrollView} >
          <Image style={styles.selected_image}
                  source={{uri:fotoSrc}}
              />
          <Input style={styles.input}
          placeholder={'Başlık'}
          maxLength={15}
          onChangeText={text => setBaslik(text)}
          defaultValue={baslik}
          />

          <Input style={styles.input}
          multiline = {true}
          numberOfLines = {4}
          placeholder={'Açıklama'}
          maxLength={500}
          defaultValue={aciklama}
          onChangeText={text => setAciklama(text)}
          />
              <View style={styles.rowContainer}>

              <FilledButton title={'Güncelle'}
              style={styles.ekleButton}
              onPress ={guncelle}
              />

          <FilledButton title={'Sil'}
          style={styles.secButton}
          onPress ={sil}

          />
          <IconButton style={styles.download_icon} name={'arrow-down-circle'} onPress ={indir}/>
            </View>



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
      width:'32%',
      marginHorizontal:15,
      height: 60,


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
       width: '80%', height: 170,
      marginHorizontal:'10%'


},
rowContainer: {
    flexDirection: 'row',
    margin: 5,
},
ekleButton: {
      marginVertical: 40,
      width:'32%',
      marginHorizontal:15,
      height:60

  },
  scrollView: {
    padding:20,
    backgroundColor: '#fff',
    width: '115%',

  },
  download_icon: {
    position: 'absolute',
    top: 50,
    right: 20,

  },

});
