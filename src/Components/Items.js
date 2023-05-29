import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

// Conexão com o banco
import { setImage, getDatas, } from '../Connections/firebaseConfig'

// Lib(s)
import * as ImagePicker from 'expo-image-picker';

// Componentes
import Item from './Item';
import NewProduct from './NewProduct';

// Aplicação visual
import Feather from 'react-native-vector-icons/Feather'
import backgroundImage from "../Images/background2.png"

export default function Items({user}) {
    const [modalVisible, setModalVisible] = useState(false)
    const [produto, setProduto] = useState({

        nome: "",
        preco: "",
        tipo: "L",
        ingredientes: "",
        descricao: "",
        imagem: "",

    })
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);

    const selectImage = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        alert('Você proibiu o acesso de mídia, não é possível seguir');
        return;
      }
      
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        quality: 1,
        aspect: [3,5]
      });
      
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setImage(result.assets[0].uri, setProduto)
      }
    };

    async function handleClose(){

      setModalVisible(false)
      setSelectedImage(null)

    }

    useEffect(() => {
        getDatas(setLoading, setProdutos)
    }, [user]);
  
    return (
      <ImageBackground  style={styles.container} source={backgroundImage}>

        <View style={{flex: 1}}>

          {!loading?(
                  
            <FlatList
                data={produtos}
                renderItem={({item, index}) => (
                  <Item data={item} index={index} setLoading={setLoading} setProdutos={setProdutos} produtos={produtos}/>
                )}
            />

          ):(

              <View style={styles.loadingBox}>

                <Feather name="loader" size={30} color="#fff"/>

              </View> 

          )}

        </View>
  
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Adicionar Produto</Text>
        </TouchableOpacity>
        <NewProduct 
          modalVisible={modalVisible} 
          selectedImage={selectedImage} 
          selectImage={selectImage} 
          setProduto={setProduto} 
          setLoading={setLoading}
          setProdutos={setProdutos}
          produto={produto} 
          loading={loading} 
          handleClose={handleClose}
        />
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    loadingBox: {

      width: "100%",
      justifyContent: "center",
      alignItems: "center"

    },
    addButton: {
      backgroundColor: 'orange',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      margin: 10,
      alignSelf: 'center',
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });