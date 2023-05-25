import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// Componentes
import LoginScreen from './src/Components/LoginScreen';
import Items from './src/Components/Items';

export default function App() {

  const [user, setUser] = useState(null)

  if(!user){
    return (
      <>

        <StatusBar hidden={true}/>
        <LoginScreen setUser={setUser}/>
      
      </>
    );
  }else{
    return (
      <>
      
        <StatusBar hidden={true}/>
        <Items user={user}/>
      
      </>
    );
  }
}