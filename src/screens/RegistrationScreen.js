import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { IconButton } from '../components/IconButton';
  

export function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <Heading style= {styles.title} >Üye Ol</Heading>
      <IconButton style={styles.closeIcon} name={'close-circle-outline'} />
      <Error error={''} />
      <Input style={styles.input}
      placeholder={'Email'}
      keyboardType= "email-address"
      />
      <Input style={styles.input}
      placeholder={'Şifre'}
      secureTextEntry
      />
      <FilledButton title={'Üye Ol'}
      style={styles.loginButton}
      onPress ={() => {}}
      />
      <FilledButton title={'İletişim'}
      style={styles.registerButton}
      onPress ={() => {}}
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
    paddingTop: 120,
  },
  title: {
    marginBottom: 48,
  },
  input: {
      marginVertical: 8,
  },
  loginButton: {
      marginVertical: 20,
  },
  registerButton: {
      marginVertical: 0,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 20,
  },

});
