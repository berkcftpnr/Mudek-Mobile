import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View , Alert, AsyncStorage ,Image , Picker ,ScrollView ,TouchableOpacity} from 'react-native';
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
export function Lecturemudek({navigation}) {
  const[donemAdi,setDonemAdi]= useState("");
    const[dersAdi,setDersAdi]= useState("");

const[userId,setUserId]= useState("");

const[detID,setdetId]= useState("");
const[lectureDocs,setLectureDocs]= useState([]);
const[examDocs,setExamDocs]= useState([]);
const[kazanimlar,setKazanimlar]= useState([]);
const[anketDocs,setAnketDocs]= useState([]);
React.useEffect(() => {

AsyncStorage.getItem('id').then((valueUser)=>{
    setUserId(valueUser)


AsyncStorage.getItem('donemId').then((value)=>{

AsyncStorage.getItem('dersId').then((dersValue)=>{

API.post("/api/asistan/donemGoruntule",{
idrequest:value
}).then((response) => {
setDonemAdi( response.data[0].name);

});

API.post("/api/egitmen/dersGoruntule",{
idrequest:dersValue
}).then((response) => {
setDersAdi( response.data[0].lecture_name);

});

API.post("/api/mudek/lectureDet",{
    dersID:dersValue,
    donemID:value,

}).then((response) => {
  setdetId( response.data[0].lecture_det_id);
  AsyncStorage.setItem("lecDetId",response.data[0].lecture_det_id.toString())
  API.post("/api/egitmen/lectureDocGoruntule",{
      lecDetID:response.data[0].lecture_det_id

  }).then((response) => {
    setLectureDocs( response.data);

  });

  API.post("/api/egitmen/anketDocGoruntule",{
      lecDetID:response.data[0].lecture_det_id

  }).then((response) => {
    setAnketDocs( response.data);

  });

  API.post("/api/egitmen/examDocGoruntule",{
      lecDetID:response.data[0].lecture_det_id

  }).then((response) => {
    setExamDocs( response.data);

  });

  API.post("/api/egitmen/kazanimGoruntule",{
      lecDetID:response.data[0].lecture_det_id

  }).then((response) => {
    setKazanimlar( response.data);

  });

});

})
})
})



}, []);





  const lectureDocSec = (val)=>{

      AsyncStorage.setItem("lecDocId",val.lecture_doc_id.toString())
        navigation.navigate('DersiciGoruntulemudek');

  }

  const examDocSec = (val)=>{

      AsyncStorage.setItem("examDocId",val.exam_doc_id.toString())
        navigation.navigate('SinavDocGoruntulemudek');

  }

  const anketSec = (val)=>{

      AsyncStorage.setItem("anketId",val.doc_id.toString())
      navigation.navigate('AnketGoruntulemudek');

  }

  const kazanimSec = (val)=>{

      AsyncStorage.setItem("kazanimId",val.attainments_id.toString())
        navigation.navigate('KazanimGoruntulemudek');

  }
  return (
    <View style={styles.container}>
    <Image style={styles.ANKU_logo}
          source={ANKU_logo}
      />

      <IconHome style={styles.homeIcon} size = {20} name={'home-outline'} onPress ={() => {
        AsyncStorage.removeItem("lecDetId")
          AsyncStorage.removeItem("donemId")
            AsyncStorage.removeItem("dersId")
        navigation.navigate('MudekScreen');//sessionlar eklenecek
      }}/>
      <View style={styles.lineStyle}>
      </View>

      <View style={styles.rowContainer} >
      <Image style={styles.fakulte_logo}
            source={Fakulte_logo}
        />

      <Heading style= {styles.titletop} >{dersAdi} </Heading>
      </View>
      <Heading style= {styles.titletop} >{donemAdi} </Heading>



      <View style={styles.lineStyle} >
      </View>

      <ScrollView style= {styles.scrollView}>

          <Heading style= {styles.title} >Ders içi Dökümanları </Heading>

          <View style={styles.lineStyle} >
          </View>
          <View style={styles.containerAcikmavi}>
            <ScrollView horizontal={true}>
            {lectureDocs.map((val)=>
                    <TouchableOpacity
                    style={styles.docButton}
                      key={val.lecture_doc_id}
                    onPress ={() => lectureDocSec(val)}
                    >
                      <View style={styles.containerKoyumavi}>
                        <Image style={styles.pdfImage}
                        source={PDF_icon}
                        />
                        <View style={styles.lineStyleDoc}>
                        </View>
                        <Text style={{color:'#f5f5f5',fontSize:15}}>
                          {val.doc_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
        )}



            </ScrollView>
          </View>

      <Heading style= {styles.title} >Sınav Dökümanları </Heading>

      <View style={styles.lineStyle} >
      </View>
      <View style={styles.containerAcikmavi}>
        <ScrollView horizontal={true}>
        {examDocs.map((val)=>
                <TouchableOpacity
                style={styles.docButton}
                  key={val.exam_doc_id}
                onPress ={() => examDocSec(val)}
                >
                  <View style={styles.containerKoyumavi}>
                    <Image style={styles.pdfImage}
                    source={PDF_icon}
                    />
                    <View style={styles.lineStyleDoc}>
                    </View>
                    <Text style={{color:'#f5f5f5',fontSize:15}}>
                      {val.doc_name}
                    </Text>
                  </View>
                </TouchableOpacity>
    )}



        </ScrollView>
      </View>

      <Heading style= {styles.title} >Ders Öğrenme Kazanımları </Heading>

      <View style={styles.lineStyle} >
      </View>
      <View style={styles.containerAcikmavi}>
        <ScrollView horizontal={true}>
          {kazanimlar.map((val)=>
          <TouchableOpacity
          style={styles.fotoButton}
              key={val.attainments_id}
          onPress ={() => kazanimSec(val)}
          >
          <View style={styles.containerKoyumaviFoto}>
            <Heading style= {styles.titleKazanim}>
            {val.attainment_type} Kazanımları
            </Heading>
          </View>
        </TouchableOpacity>
)}


        </ScrollView>
      </View>


  <Heading style= {styles.title} >Ölçme ve Değerlendirme Evrakları </Heading>

  <View style={styles.lineStyle} >
  </View>
  <View style={styles.containerAcikmavi}>
    <ScrollView horizontal={true}>
    {anketDocs.map((val)=>
            <TouchableOpacity
            style={styles.docButton}
              key={val.doc_id}
            onPress ={() => anketSec(val)}
            >
              <View style={styles.containerKoyumavi}>
                <Image style={styles.pdfImage}
                source={PDF_icon}
                />
                <View style={styles.lineStyleDoc}>
                </View>
                <Text style={{color:'#f5f5f5',fontSize:15}}>
                  {val.doc_name}
                </Text>
              </View>
            </TouchableOpacity>
)}



    </ScrollView>
  </View>

  <View style={styles.lineStyle}>
  </View>

  <StatusBar style="auto" />
  </ScrollView>
  <View style={styles.lineStyle}>
  </View>

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
      fontSize:21,
  },

  titleKazanim: {
      marginTop: 45,
      textAlign:'center',
      fontSize:21,
      color: 'white',
  },

  titletop: {
      marginBottom: 5,
      marginTop: 5,
      textAlign:'center',
      fontSize:21,
  },

  ANKU_logo: {
    alignContent:'flex-start',
    height:50,
    width:50,
  },

  fakulte_logo: {
    height:50,
    width:50,
    position: 'absolute',
    top: 15,
    right: 245,
    marginRight: 5
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
    padding: 20,
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

rowContainer: {
    flexDirection: 'row',
    margin: 5,
},


});
