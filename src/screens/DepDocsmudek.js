import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, ScrollView, Text, View , Alert, AsyncStorage ,Image , Picker , TouchableOpacity } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { API} from '../config/config';
import { Error } from '../components/Error';
import { IconHome } from '../components/IconHome';

import ANKU_logo from '../images/ANKU_logo.png';
import MUDEK_logo from '../images/MUDEK.png';
import PDF_icon from '../images/pdf_icon.png';
import EKLE_img from '../images/ekle_img.png';
import Fakulte_logo from '../images/fakulte_logo.png';


export function DepDocsmudek({navigation}) {
  const[donemAdi,setDonemAdi]= useState("");
  const[foto,setFoto]=useState([]);
const[userId,setUserId]= useState("");
const[docs,setDocs]= useState([]);
/*const unsubscribe = navigation.addListener('state', () => {

});*/
      React.useEffect(() => {

    AsyncStorage.getItem('id').then((valueUser)=>{
          setUserId(valueUser)


  AsyncStorage.getItem('donemId').then((value)=>{

   API.post("/api/asistan/donemGoruntule",{
      idrequest:value
  }).then((response) => {
    setDonemAdi( response.data[0].name);

});

API.post("/api/mudek/fotoGoruntule",{
    donemID:value,

        }).then((response) => {

  setFoto( response.data );
});

API.post("/api/mudek/docGoruntule",{
    donemID:value,

        }).then((response) => {

  setDocs( response.data );
});


  })
    })



}, []);



  const docSec = (val)=>{

      AsyncStorage.setItem("docId",val.department_doc_id.toString())
        navigation.navigate('DepDocsGoruntulemudek');

  }

const fotoSec = (val)=>{


    AsyncStorage.setItem("fotoId",val.photos_id.toString())
      navigation.navigate('FotoGoruntulemudek');

}




  return (
    <View style={styles.container}>
    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
      <IconHome style={styles.homeIcon} size = {20} name={'home-outline'} onPress ={() => {
        AsyncStorage.removeItem("donemId")
        navigation.navigate('MudekScreen');//sessionlar eklenecek

      }}/>
    <View style={styles.lineStyle}>
    </View>

    <View style={styles.rowContainer} >
    <Image style={styles.fakulte_logo}
          source={Fakulte_logo}
      />

    <Heading style= {styles.titletop} >  {donemAdi} </Heading>
    </View>

    <View style={styles.lineStyle} >
    </View>

    <ScrollView style= {styles.scrollView}>
      <Heading style= {styles.title} >  Bölüm Evrakları </Heading>
        <View style={styles.lineStyle}>
        </View>

        <View style={styles.containerAcikmavi}>
          <ScrollView horizontal={true}>


    {docs.map((val)=>
            <TouchableOpacity
            style={styles.docButton}
              key={val.department_doc_id}
            onPress ={() => docSec(val)}
            >
              <View style={styles.containerKoyumavi}>
                <Image style={styles.pdfImage}
                source={PDF_icon}
                />
                <View style={styles.lineStyleDoc}>
                </View>
                <Text style={{color:'#f5f5f5',fontSize:15}}>
                  {val.doc_desc}
                </Text>
              </View>
            </TouchableOpacity>
)}

          </ScrollView>
        </View>

      <Heading style= {styles.title} >  Fotoğraflar </Heading>
      <View style={styles.lineStyle}>
      </View>

      <View style={styles.containerAcikmavi}>
        <ScrollView horizontal={true}>

        {foto.map((val)=>
          <TouchableOpacity
          style={styles.fotoButton}
          key={val.photos_id}
          onPress ={() => fotoSec(val) }
          >
            <View style={styles.containerKoyumaviFoto}>
              <Image style={styles.images}
              source={{uri:val.path}}

              />
            </View>
          </TouchableOpacity>
)}
        </ScrollView>
      </View>

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
    marginBottom: 15,
      marginTop: 15,
      textAlign:'center',
      fontSize:21
  },

  titletop: {
      marginBottom: 5,
      marginTop: 5,
      textAlign:'center',
      fontSize:21,
      marginHorizontal:45
  },

  ANKU_logo: {
    alignContent:'flex-start',
    height:50,
    width:50
  },

  containerAcikmavi: {
    flex: 1,
    padding: 20,
    backgroundColor: '#8cb8ff',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom:40,
    width: '100%',
    borderWidth: 1,
    height:250,
    borderRadius:5
  },

  containerKoyumavi: {
    flex: 1,
    padding: 20,
    backgroundColor: '#16394e',
    alignItems: 'center',
    paddingTop: 20,
    width: '100%',
    borderRadius:5
  },

  containerKoyumaviEkle: {
    flex: 1,
    padding: 20,
    backgroundColor: '#16394e',
    alignItems: 'center',
    paddingTop: 40,
    width: '100%',
    borderRadius:5
  },

  containerKoyumaviFoto: {
    flex: 1,
    padding: 20,
    backgroundColor: '#16394e',
    alignItems: 'center',
    paddingTop: 20,
    width: '100%',
    borderRadius:5,

  },

  containerKoyumaviEkleFoto: {
    flex: 1,
    padding: 20,
    backgroundColor: '#16394e',
    alignItems: 'center',
    paddingTop: 40,
    width: '100%',
    borderRadius:5
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

  lineStyleDoc:{
    borderWidth: 0.5,
    borderColor:'white',
    marginTop:8,
    marginBottom:2,
    width: '150%',
  },

  pdfImage:{
    width:60,
    height:100,
    marginBottom:10
  },

  docButton:{
paddingHorizontal:4
  },

  fotoButton:{
    width: 220,
    paddingHorizontal:4
  },

  ekleButton: {
    marginVertical: 10,
    width:'15%',
    height:15,
  },

  rowContainer: {
    flexDirection: 'row',
    margin: 5,
  },

  homeIcon: {
    position: 'absolute',
    top: 70,
    right: 25,
},

fakulte_logo: {
  height:50,
  width:50,
  position: 'absolute',
  top: -5,
  left:0


},
images:{
  width:200,
  height:'100%',
  marginBottom:10
},


});
