import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import {NavigationContainer} from '@react-navigation/native';

// Componentes
import LoginScreen from './src/Components/LoginScreen';
import BottomTabRoute from './src/Routes/BottomTabRoute';


// LocalStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [user, setUser] = useState(null)

  async function getUserUid(){

    let userid = await AsyncStorage.getItem('@useruid')
    
    if(userid){

      setUser(userid)

    }

  }

  useEffect(() => {

    getUserUid()

  }, [])

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
        <NavigationContainer>
        
          <BottomTabRoute userUid={user} setUser={setUser}/>

        </NavigationContainer>
      </>
    );
  }
}