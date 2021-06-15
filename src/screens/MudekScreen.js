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

export function MudekScreen({navigation}) {
    const[kullanıcıAdi,setKullaniciAdi]= useState("");
    const[seciliDonem,setSeciliDonem]= useState("");
    const[donemler,setDonemler]=useState([]);
    const[seciliDonemDep,setSeciliDonemDep]= useState("");
    const[dersler,setDersler]=useState([]);
    const[seciliDers,setSeciliDers]= useState("");
    React.useEffect(() => {
    AsyncStorage.getItem('name').then((value)=>{
      setKullaniciAdi(value)

    })

    API.get("/api/donemGoruntule").then((response) => {
    setDonemler( response.data );
    API.post("/api/admin/dersGoruntuleAnaSayfa",{
        donem_id: response.data[0].semester_id,

      }).then((response)=>{
        setDersler(response.data)
      })
});

  }, []);

  function donemDegis (itemValue)  {
    setSeciliDonem(itemValue)

    API.post("/api/admin/dersGoruntuleAnaSayfa",{
        donem_id: itemValue,


    }).then((response)=>{
      setDersler(response.data)
      setSeciliDers(response.data.[0].lecture_id)
    })
}

  return (
    <View style={styles.container}>
    <IconButton style={styles.closeIcon} name={'exit-outline'} onPress ={() => {
      AsyncStorage.removeItem("name")
      AsyncStorage.removeItem("id")
      AsyncStorage.removeItem("level")
      navigation.navigate('Login');//sessionlar eklenecek
}}/>

    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
      <View style={styles.lineStyle}>
      </View>
      <ScrollView style={styles.scrollView} >
          <Heading style= {styles.title} >Hoşgeldiniz {kullanıcıAdi} </Heading>
          <View style={styles.lineStyle}>
          </View>

          <Text style={styles.textStyle}>
       Ders Dökümanları
     </Text>
          <View style={styles.lineStyle}>
          </View>
          <Picker style={styles.rol_secimi}
            selectedValue={seciliDonem}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => donemDegis(itemValue)}
          >
          {donemler.map((val)=>
                <Picker.Item label={val.name} value={val.semester_id} key={val.semester_id}/>
              )}

          </Picker>
          <View style={styles.lineStyle}>
          </View>
          <Picker style={styles.rol_secimi}
            selectedValue={seciliDers}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => setSeciliDers(itemValue)}
          >
          {dersler.map((val)=>
              <Picker.Item label={val.lecture_code +"  "+val.lecture_name} value={val.lecture_id} key={val.lecture_id}/>
              )}

          </Picker>
          <View style={styles.lineStyle}>
          </View>
          <FilledButton title={'Seç'}
          style={styles.secButton}
          onPress ={() => {
            if(seciliDonem.length===0){
              alert("DÖNEM SEÇİLMEDİ")
            }else if(seciliDers.length===0){
              alert("DERS SEÇİLMEDİ")
}           else{
            AsyncStorage.setItem("donemId",seciliDonem.toString());
            AsyncStorage.setItem("dersId",seciliDers.toString());
            navigation.navigate('Lecturemudek');


}
          }}
          />
          <View style={styles.lineStyle}>
          </View>
          <Text style={styles.textStyle}>
       Bölüm Evrakları
     </Text>

          <View style={styles.lineStyle}>
          </View>
          <Picker style={styles.rol_secimi}
            selectedValue={seciliDonemDep}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => setSeciliDonemDep(itemValue)}
          >
          {donemler.map((val)=>
                <Picker.Item label={val.name} value={val.semester_id} key={val.semester_id}/>
              )}

          </Picker>
          <View style={styles.lineStyle}>
          </View>
          <FilledButton title={'Seç'}
          style={styles.secButton}
          onPress ={() => {
            if(seciliDonem.length===0){
              alert("Dönem Seçiniz")
            }else{
            AsyncStorage.setItem("donemId",seciliDonemDep.toString());

            navigation.navigate('DepDocsmudek');
          }  }}
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
    marginBottom: 15,
      marginTop:15,
    textAlign:'center',
  },
  input: {
      marginVertical: 8,
  },ANKU_logo: {
    alignContent:'flex-start',
    height:50,
    width:50
  },rol_secimi: {
    marginVertical:8
  },
  secButton: {
    marginVertical: 20,
    width:'22%',
  marginHorizontal:130
  },
   lineStyle:{
          borderWidth: 0.5,
          borderColor:'#16394e',
          margin:10,
          width: '100%',
     },
     closeIcon: {
       position: 'absolute',
       top: 60,
       right: 20,


     },
     scrollView: {
       padding:20,
       backgroundColor: '#fff',
       width: '100%',

     },
     textStyle:{
           textAlign:'center',
            fontWeight: 'bold'
     },


});
