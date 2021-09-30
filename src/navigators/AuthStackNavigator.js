import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {LoginScreen} from '../screens/LoginScreen';
import {RegistrationScreen} from '../screens/RegistrationScreen';
import {AsistantScreen} from '../screens/AsistantScreen';
import {InstructorScreen} from '../screens/InstructorScreen';
import {MudekScreen} from '../screens/MudekScreen';
import {Pending} from '../screens/Pending';
import {Pending2} from '../screens/Pending2';
import {DepDocs} from '../screens/DepDocs';
import {DepDocsEkle} from '../screens/DepDocsEkle';
import {DersiciEkle} from '../screens/DersiciEkle';
import {FotoEkle} from '../screens/FotoEkle';
import {AnketEkle} from '../screens/AnketEkle';
import {KazanimEkle} from '../screens/KazanimEkle';
import {SinavDocEkle} from '../screens/SinavDocEkle';
import {SifremiUnuttum} from '../screens/SifremiUnuttum';
import {Contact} from '../screens/Contact';
import {Lecture} from '../screens/Lecture';
import {FotoGoruntule} from '../screens/FotoGoruntule';
import {DepDocsGoruntule} from '../screens/DepDocsGoruntule';
import {DersiciGoruntule} from '../screens/DersiciGoruntule';
import {SinavDocGoruntule} from '../screens/SinavDocGoruntule';
import {KazanimGoruntule} from '../screens/KazanimGoruntule';
import {AnketGoruntule} from '../screens/AnketGoruntule';

import {DepDocsmudek} from '../screens/DepDocsmudek';
import {Lecturemudek} from '../screens/Lecturemudek';
import {FotoGoruntulemudek} from '../screens/FotoGoruntulemudek';
import {DepDocsGoruntulemudek} from '../screens/DepDocsGoruntulemudek';
import {DersiciGoruntulemudek} from '../screens/DersiciGoruntulemudek';
import {SinavDocGoruntulemudek} from '../screens/SinavDocGoruntulemudek';
import {KazanimGoruntulemudek} from '../screens/KazanimGoruntulemudek';
import {AnketGoruntulemudek} from '../screens/AnketGoruntulemudek';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const AuthStack = createStackNavigator();

export function AuthStackNavigator() {
  return (

      <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
        <AuthStack.Screen name={'Login'} component={LoginScreen} />
        <AuthStack.Screen name={'Registration'} component={RegistrationScreen} />
          <AuthStack.Screen name={'Asistant'} component={AsistantScreen} />
          <AuthStack.Screen name={'Instructor'} component={InstructorScreen} />
          <AuthStack.Screen name={'MudekScreen'} component={MudekScreen} />
          <AuthStack.Screen name={'Pending'} component={Pending} />
          <AuthStack.Screen name={'Pending2'} component={Pending2} />
          <AuthStack.Screen name={'DepDocs'} component={DepDocs} />
          <AuthStack.Screen name={'Lecture'} component={Lecture} />
          <AuthStack.Screen name={'DepDocsEkle'} component={DepDocsEkle} />
          <AuthStack.Screen name={'DersiciEkle'} component={DersiciEkle} />
          <AuthStack.Screen name={'SinavDocEkle'} component={SinavDocEkle} />
          <AuthStack.Screen name={'FotoEkle'} component={FotoEkle} />
          <AuthStack.Screen name={'AnketEkle'} component={AnketEkle} />
          <AuthStack.Screen name={'KazanimEkle'} component={KazanimEkle} />
          <AuthStack.Screen name={'SifremiUnuttum'} component={SifremiUnuttum} />
          <AuthStack.Screen name={'FotoGoruntule'} component={FotoGoruntule} />
          <AuthStack.Screen name={'DepDocsGoruntule'} component={DepDocsGoruntule} />
          <AuthStack.Screen name={'DersiciGoruntule'} component={DersiciGoruntule} />
          <AuthStack.Screen name={'SinavDocGoruntule'} component={SinavDocGoruntule} />
          <AuthStack.Screen name={'KazanimGoruntule'} component={KazanimGoruntule} />
          <AuthStack.Screen name={'AnketGoruntule'} component={AnketGoruntule} />

          <AuthStack.Screen name={'FotoGoruntulemudek'} component={FotoGoruntulemudek} />
          <AuthStack.Screen name={'DepDocsGoruntulemudek'} component={DepDocsGoruntulemudek} />
          <AuthStack.Screen name={'DersiciGoruntulemudek'} component={DersiciGoruntulemudek} />
          <AuthStack.Screen name={'SinavDocGoruntulemudek'} component={SinavDocGoruntulemudek} />
          <AuthStack.Screen name={'KazanimGoruntulemudek'} component={KazanimGoruntulemudek} />
          <AuthStack.Screen name={'AnketGoruntulemudek'} component={AnketGoruntulemudek} />
          <AuthStack.Screen name={'DepDocsmudek'} component={DepDocsmudek} />
          <AuthStack.Screen name={'Lecturemudek'} component={Lecturemudek} />
          <AuthStack.Screen name={'Contact'} component={Contact} />
      </AuthStack.Navigator>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
