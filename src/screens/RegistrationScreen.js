import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect}  from 'react';
import { StyleSheet, Text, View, ScrollView ,Image, Picker, AsyncStorage } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { IconButton } from '../components/IconButton';
import ANKU_logo from '../images/ANKU_logo.png';
import MUDEK_logo from '../images/MUDEK.png';
import { API} from '../config/config';

export function RegistrationScreen({navigation}) {
  const [selectedValue, setSelectedValue] = useState("Asistan");
  const [email, setEmail] = useState("");
  const [isim, setisim] = useState("");
  const [sifre, setSifre] = useState("");
  const [sifreTekrar, setSifreTekrar] = useState("");
  const [placeholderr, setPlaceholderr] = useState("");

    useEffect(() => {
  AsyncStorage.getItem('name').then((value) =>
         setPlaceholderr(value)
       );
  }, []);

    const kayit =()=> {

      if(!email.includes('@') || !email.includes('.'))
    alert("Lütfen geçerli bir e-mail adresi giriniz.");

  else if(sifre === "")
    alert("Bir şifre belirlemediniz.");

  else if(sifre.length < '8')
    alert("En az 8 karakterli bir şifre belirleyiniz.");

  else if( sifre !== sifreTekrar )
    alert("Girdiğiniz şifreler birbiri ile uyuşmuyor. Lütfen tekrar deneyiniz.");

  else{
      var idCo;

      var role=4;
      if(selectedValue==="Asistan")
      role=5;
      else if(selectedValue==="Egitmen")
      role=4;
      else if(selectedValue==="Mudekyetkilisi")
      role=6;


        API.get("/api/kayitOl2").then((response)=>{

          idCo=response.data;
          var bosid=0;
          var idcount=1;
          var j=0;
          while(bosid===0){
            bosid=1;
            j=0;
            while(j<idCo.length){
            if(idCo[j].user_id===idcount){
              bosid=0;
            }
            j++;
            }
      idcount= idcount+1;
}

      API.post("/api/kayitOl",{
  id:idcount-1,
  eMail:email,
  password:sifre,
  level:role,
  uname:isim

}).then((response)=>{
  if(response.data.message){
    alert(response.data.message)
  }

})

});
}

    }



  return (
    <View style={styles.container}>
    <IconButton style={styles.closeIcon} name={'close-circle-outline'} onPress ={() => {
      navigation.navigate('Login');
}}/>
<Image style={styles.ANKU_logo}
      source={ANKU_logo}
  />
  <Image style={styles.MUDEK_logo}
        source={MUDEK_logo}
    />
    <Heading style= {styles.title} >Üye Ol</Heading>
      <ScrollView style={styles.scrollView} >



      <Error error={''} />
      <Picker style={styles.rol_secimi}
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Asistan" value="5" />
        <Picker.Item label="Eğitmen" value="4" />
        <Picker.Item label="Mudek-Yetkilisi" value="6" />
      </Picker>
      <Input style={styles.input}
      placeholder={placeholderr}
      keyboardType= "email-address"
      onChangeText={text => setEmail(text)}

      />
      <Input style={styles.input}
      placeholder={'İsim'}
      onChangeText={text => setisim(text)}
      />
      <Input style={styles.input}
      placeholder={'Şifre'}
      secureTextEntry
      onChangeText={text => setSifre(text)}
      />
      <Input style={styles.input}
      placeholder={'Şifre Tekrar'}
      secureTextEntry
      onChangeText={text => setSifreTekrar(text)}
      />
      <FilledButton title={'Üye Ol'}
      style={styles.loginButton}
      onPress ={kayit}
      />
      <FilledButton title={'İletişim'}
      style={styles.registerButton}
      onPress ={() => {}}
      />

      <StatusBar style="auto" />
  </ScrollView >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 120,
    paddingBottom: 0,

  },
  title: {
    marginBottom: 0,
  },
  input: {
      marginVertical: 8,
  },
  loginButton: {
      marginVertical: 20,
  },
  registerButton: {
      marginVertical: 0,
      marginBottom:50
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
  ANKU_logo: {
    alignContent:'flex-start',
    height:50,
    width:50
  },
  MUDEK_logo: {
    alignContent:'flex-end',
    height:50,
    width:150
  },
  rol_secimi: {
    marginVertical:8
  },

});
