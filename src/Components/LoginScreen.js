import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import backgroundImage from '../Images/background.png'
import logoImage from '../Images/logo.png'
import { database } from '../Connections/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ref, get } from 'firebase/database';
import Feather from 'react-native-vector-icons/Feather'

const LoginScreen = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
   
    if(email != '' && password != ''){
      login()
    }else{

      alert("Preencha os dados corretamente!")

    }

  };

  async function login(){

    let boolean = false
    const auth = getAuth();
    let newEmail = email.toLowerCase()
    newEmail = newEmail.replace(" ", "")

    let userCredential;
    await signInWithEmailAndPassword(auth, newEmail, password).then((user) => userCredential = user).catch(response => alert(response));

    // Obter o ID do usuário logado
    if(userCredential){
      const userId = userCredential.user.uid;

      // Exemplo de acesso a dados no Realtime Database
      const userRef = ref(database, `usuarios/${userId}`);
      let userData;
  
      await get(userRef).then((snapshot) => {
  
        userData = snapshot.val()
        console.log(userData.cargo)

      })

      if(!userData){

        boolean = false

      } 
  
      if(userData.cargo != "Cliente"){

        boolean = true;

      }else{

        alert("Seu login não condiz com os dados necessários")
        boolean = false

      }
    }

    if(boolean){

      setUser(boolean)

    }

  }


  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <View style={styles.passwordContainer}>

            <TextInput
              style={[styles.input, {width: "79%", marginRight: "1%"}]}
              placeholder={showPassword? "•••••": "Senha"}
              placeholderTextColor="gray"
              secureTextEntry={showPassword}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            <View style={[styles.passwordButton, {width: "20%"}]}>
              {!showPassword ? <Feather style={[]} name='eye' size={25} color={'orange'} onPress={() => setShowPassword(!showPassword)}/> : <Feather style={[]} name='eye-off' size={25} color={"rgba(50,50,50, 0.6)"} onPress={() => setShowPassword(!showPassword)}/> }
            </View>

          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#000'
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '75%',
    borderWidth: 1.5,
    borderColor: '#000'
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  passwordContainer: {

    width: '100%',
    flexDirection: "row",
    height: 50,
    borderRadius: 5,
    marginBottom: 10,

  },
  passwordButton:{

    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",

  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
