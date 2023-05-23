import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/Components/LoginScreen';
import Items from './src/Components/Items';

export default function App() {

  const [user, setUser] = useState(null)

  if(!user){
    return (
      <LoginScreen setUser={setUser}/>
    );
  }else{
    return (
      <Items user={user}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
