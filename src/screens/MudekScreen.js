import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View , Alert, AsyncStorage ,Image , Picker } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';

import { Error } from '../components/Error';
import { API} from '../config/config';
import ANKU_logo from '../images/ANKU_logo.png';
import MUDEK_logo from '../images/MUDEK.png';

export function MudekScreen({navigation}) {
    const[kullanıcıAdi,setKullaniciAdi]= useState("");
    const[seciliDonem,setSeciliDonem]= useState("");
    const[donemler,setDonemler]=useState([]);

    React.useEffect(() => {
    AsyncStorage.getItem('name').then((value)=>{
      setKullaniciAdi(value)

    })

    API.get("/api/donemGoruntule").then((response) => {
    setDonemler( response.data );

});

  }, []);

  return (
    <View style={styles.container}>
    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
          <Heading style= {styles.title} >Hoşgeldiniz {kullanıcıAdi} mudek</Heading>

          <Picker style={styles.rol_secimi}
            selectedValue={seciliDonem}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => setSeciliDonem(itemValue)}
          >
          {donemler.map((val)=>
                <Picker.Item label={val.name} value={val.semester_id} key={val.semester_id}/>
              )}

          </Picker>

          <Picker style={styles.rol_secimi}
            selectedValue={seciliDonem}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) => setSeciliDonem(itemValue)}
          >
          {donemler.map((val)=>
                <Picker.Item label={val.name} value={val.semester_id} key={val.semester_id}/>
              )}

          </Picker>
          <FilledButton title={'Seç'}
          style={styles.secButton}
          onPress ={() => {
            alert("Bölüm Dökümanları Sayfası")
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
    marginBottom: 48,
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
      marginVertical: 0,

  },


});
