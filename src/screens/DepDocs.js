import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, ScrollView, Text, View , Alert, AsyncStorage ,Image , Picker , TouchableOpacity } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';

import { Error } from '../components/Error';

import ANKU_logo from '../images/ANKU_logo.png';
import MUDEK_logo from '../images/MUDEK.png';
import PDF_icon from '../images/pdf_icon.png';
import EKLE_img from '../images/ekle_img.png';


export function DepDocs({navigation}) {




  return (
    <View style={styles.container}>
    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />
    <View style={styles.lineStyle}>
    </View>

    <Heading style= {styles.titletop} >2020 - 2021 Güz Dönemi </Heading>

    <View style={styles.lineStyle} >
    </View>

    <ScrollView style= {styles.scrollView}>
      <Heading style= {styles.title} >  Bölüm Evrakları </Heading>
        <View style={styles.lineStyle}>
        </View>

        <View style={styles.containerAcikmavi}>
          <ScrollView horizontal={true}>
            <TouchableOpacity
            style={styles.docButton}
            onPress ={() => {
            }}
            >
              <View style={styles.containerKoyumavi}>
                <Image style={styles.pdfImage}
                source={PDF_icon}
                />
                <View style={styles.lineStyleDoc}>
                </View>
                <Text style={{color:'#f5f5f5',fontSize:15}}>
                  Evrak Adı
                </Text>
              </View>
            </TouchableOpacity>

          <View style={{height:'100%',width:15,backgroundColor:'#8cb8ff'}}>
          </View>

            <TouchableOpacity
            style={styles.docButton}
            onPress ={() => {
            }}
            >
              <View style={styles.containerKoyumavi}>
                <Image style={styles.pdfImage}
                source={PDF_icon}
                />
                <View style={styles.lineStyleDoc}>
                </View>
                <Text style={{color:'#f5f5f5',fontSize:15}}>
                  Evrak Adı
                </Text>
              </View>
            </TouchableOpacity>

          <View style={{height:'100%',width:15,backgroundColor:'#8cb8ff'}}>
          </View>

            <TouchableOpacity
            style={styles.docButton}
            onPress ={() => {
              navigation.navigate('DepDocsEkle');
            }}
            >
              <View style={styles.containerKoyumaviEkle}>
                <Image style={styles.pdfImage}
                source={EKLE_img}
                />
              </View>

            </TouchableOpacity>
          </ScrollView>
        </View>

      <Heading style= {styles.title} >  Fotoğraflar </Heading>
      <View style={styles.lineStyle}>
      </View>

      <View style={styles.containerAcikmavi}>
        <ScrollView horizontal={true}>
          <TouchableOpacity
          style={styles.fotoButton}
          onPress ={() => {
          }}
          >
            <View style={styles.containerKoyumaviFoto}>
              <Image style={styles.pdfImage}
              source={PDF_icon}
              />
            </View>
          </TouchableOpacity>

        <View style={{height:'100%',width:15,backgroundColor:'#8cb8ff'}}>
        </View>

          <TouchableOpacity
          style={styles.fotoButton}
          onPress ={() => {
          }}
          >
            <View style={styles.containerKoyumaviFoto}>
              <Image style={styles.pdfImage}
              source={PDF_icon}
              />
            </View>
          </TouchableOpacity>

        <View style={{height:'100%',width:15,backgroundColor:'#8cb8ff'}}>
        </View>

          <TouchableOpacity
          style={styles.fotoButton}
          onPress ={() => {
            navigation.navigate('FotoEkle');
          }}
          >
            <View style={styles.containerKoyumaviEkleFoto}>
              <Image style={styles.pdfImage}
              source={EKLE_img}
              />
            </View>

          </TouchableOpacity>
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
      fontSize:21
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
    borderRadius:5
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

  },

  fotoButton:{
    width: 220,
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


});
