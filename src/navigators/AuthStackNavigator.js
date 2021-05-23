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
          <AuthStack.Screen name={'Mudek'} component={MudekScreen} />
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
