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
    const[dersler,setDersler]=useState([]);
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

  return (
    <View style={styles.container}>
    <IconButton style={styles.closeIcon} name={'exit-outline'} onPress ={() => {
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
            onValueChange={(itemValue, itemIndex) => setSeciliDonem(itemValue)}
          >
          {donemler.map((val)=>
                <Picker.Item label={val.name} value={val.semester_id} key={val.semester_id}/>
              )}

          </Picker>
          <View style={styles.lineStyle}>
          </View>
          <Picker style={styles.rol_secimi}
            selectedValue={seciliDonem}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => setSeciliDonem(itemValue)}
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
            alert("Bölüm Dökümanları Sayfası")
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
            selectedValue={seciliDonem}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => setSeciliDonem(itemValue)}
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
            alert("Bölüm Dökümanları Sayfası")
          }}
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
