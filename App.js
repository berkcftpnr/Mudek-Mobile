import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {LoginScreen} from './src/screens/LoginScreen';
import {RegistrationScreen} from './src/screens/RegistrationScreen';
import {AsistantScreen} from './src/screens/AsistantScreen';
import {InstructorScreen} from './src/screens/InstructorScreen';
import {MudekScreen} from './src/screens/MudekScreen';
import {Pending} from './src/screens/Pending';
import {Pending2} from './src/screens/Pending2';
import {DepDocs} from './src/screens/DepDocs';
import {DepDocsEkle} from './src/screens/DepDocsEkle';
import {DersiciEkle} from './src/screens/DersiciEkle';
import {SinavDocEkle} from './src/screens/SinavDocEkle';
import {FotoEkle} from './src/screens/FotoEkle';
import {AnketEkle} from './src/screens/AnketEkle';
import {KazanimEkle} from './src/screens/KazanimEkle';
import {Lecture} from './src/screens/Lecture';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackNavigator} from './src/navigators/AuthStackNavigator';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
        <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>

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
