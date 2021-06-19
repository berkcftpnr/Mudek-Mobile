import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View , Alert, AsyncStorage ,Image ,Linking, Picker ,PermissionsAndroid,ScrollView} from 'react-native';
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




export function KazanimGoruntule({navigation}) {

  const[docId,setDocId]=useState("");



  const [aciklama, setAciklama] = useState("");
  const [baslik, setBaslik] = useState("");
    React.useEffect(() => {

      AsyncStorage.getItem('kazanimId').then((value)=>{
      API.post("/api/egitmen/kazanimiGoruntule",{
          docID:value,

              }).then((response) => {

        setBaslik(response.data[0].attainment_type)
        setAciklama(response.data[0].explanation)
        setDocId(value)
      });


          })


  }, []);







    const sil = ()=>{

      API.post("api/egitmen/kazanimsil",{
          docId:docId,
      }).then((response)=>{
        AsyncStorage.removeItem("kazanimId")
        navigation.navigate('Instructor');
        navigation.navigate('Lecture');
        if(response.data.message){
          alert(response.data.message)
        }

      })

    }

      const guncelle =()=>{
        API.post("/api/egitmen/kazanimguncelle",{
                docId:docId,
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
      AsyncStorage.removeItem("kazanimId")
      navigation.navigate('Instructor');
      navigation.navigate('Lecture');//sessionlar eklenecek

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
      marginHorizontal:35,
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