import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
  ImageBackground
} from 'react-native';
import backgroundImage from "../Images/background2.png"
import backgroundImage2 from "../Images/background3.png"
import { getDatabase, ref, get, set, push } from 'firebase/database';
import Item from './Item';
import app from '../Connections/firebaseConfig'
import { getStorage, ref as storageref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export default function Items({user}) {
    const [modalVisible, setModalVisible] = useState(false)
    const [produto, setProduto] = useState({

        nome: "",
        preco: "",
        tipo: "L",
        imagem: ""

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
        setSelectedImage({uri: result.uri});
      }
    };

    async function getDatas(){

      setLoading(true)
      const database = getDatabase(app);
      const storage = getStorage(app);
      const productsRef = ref(database, `produtos/`);
      setProdutos([])
      
      await get(productsRef).then((snapshot, index) => {
        
        if(snapshot.exists()){
          setProdutos(Object.values(snapshot.val()))
        }

      })
      setLoading(false)

    }

    async function handleDelete(index){
      setLoading(true)
      const database = getDatabase(app);
      const productsRef = ref(database, 'produtos/');
    
      // Atualizar o banco de dados com o novo array de produtos
      setProdutos(produtos.splice(index, 1))
    
      await set(productsRef, produtos)
      // Obter os dados atualizados do banco de dados
      getDatas();
      setLoading(false)
    }
    
    async function handleAdd(){
      setLoading(true)
      const database = getDatabase(app);
      const productsRef = ref(database, 'produtos/');
      const storage = getStorage(app)
      
      if(produto.nome != "" || produto.preco != "" || produto.imagem != ""){
        // Atualizar o banco de dados com o novo array de produtos
        let imageName = produto.nome.replace(" ", "")
        const storageRef = storageref(storage, `images/${imageName}.png`)
        await uploadBytes(storageRef, selectedImage).then((snapshot) => {
          console.log(snapshot)
          getDownloadURL(storageRef)
            .then((url) => {
              console.log(url)
              setProduto((prevProduct) => ({ ...prevProduct, imagem: `${url}` }))
            })
            .catch((error) => console.log('Erro ao obter URL da imagem:', error));
        });
        await push(productsRef, produto)
        
      }else{

        alert("Preencha os dados corretamente!")

      }
      // Obter os dados atualizados do banco de dados
      getDatas();
      setModalVisible(false)
      setLoading(false)
    }

    async function handleClose(){

      setModalVisible(false)
      setSelectedImage(null)

    }

    useEffect(() => {
        getDatas()
    }, [user]);
  
    return (
      <ImageBackground  style={styles.container} source={backgroundImage}>
        <StatusBar hidden={true} />
        <View style={{flex: 1}}>

          {!loading?(
                  
            <FlatList
                data={produtos}
                renderItem={({item, index}) => (
                  <Item data={item} index={index} handleDelete={handleDelete}/>
                )}
            />

          ):(

            <View style={styles.loadingBox}>

              <Text style={{color: "red", fontSize: 25}}> Carregando! </Text>

            </View> 

          )}

        </View>
  
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Adicionar Produto</Text>
        </TouchableOpacity>
  
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <ImageBackground style={styles.modalContainer} source={backgroundImage2}>
            <View style={styles.modalContent}>
              <View style={styles.rowModalTitle}>

              <Text style={styles.modalTitle}>Adicionar Produto</Text>

              <TouchableOpacity style={{alignItems: "center", justifyContent: "center", height: 60,}} onPress={() => handleClose()}>
                
                <Text style={styles.modalX}> X </Text>

              </TouchableOpacity> 

              </View>

              {selectedImage &&
                <Image
              
                  source={selectedImage}
                  style={[styles.modalInput, {height: "20%", objectFit: "contain", marginBottom: 5}]}

                />
              } 

               <TouchableOpacity
                style={!selectedImage? [styles.optionButton, {justifyContent: "flex-start", marginBottom: 12}]: [styles.optionButton, {justifyContent: "flex-start", marginBottom: 12,backgroundColor: 'rgba(0,0,0,0.9)',}]}
                onPress={selectImage}
               >

                <Text style={styles.optionText}>Selecione uma imagem</Text>

               </TouchableOpacity>
            
              <TextInput
                style={[styles.modalInput, {marginBottom: 5}]}
                placeholder="Nome"
                onChangeText={(text) =>
                    setProduto((prevProduct) => ({ ...prevProduct, nome: text }))
                }
                value={setProduto.nome}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Preço"
                onChangeText={(text) =>
                    setProduto((prevProduct) => ({ ...prevProduct, preco: text }))
                }
                value={setProduto.preco}
                keyboardType='numeric'
              />

              <TouchableOpacity
                style={[styles.optionButton, produto.tipo === 'L' && styles.selectedOption]}
                onPress={() => setProduto((prevProduct) => ({ ...prevProduct, tipo: 'L' }))}
              >
                <Text style={styles.optionText}>Lanche</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionButton, produto.tipo === 'A' && styles.selectedOption]}
                onPress={() => setProduto((prevProduct) => ({ ...prevProduct, tipo: 'A' }))}
              >
                <Text style={styles.optionText}>Acompanhamento</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionButton, produto.tipo === 'R' && styles.selectedOption]}
                onPress={() => setProduto((prevProduct) => ({ ...prevProduct, tipo: 'R' }))}
              >
                <Text style={styles.optionText}> Refrigerante </Text>
              </TouchableOpacity>

              <Button title={loading? "Carregando...": "Adicionar"} onPress={handleAdd} disabled={loading}/>
            </View>
          </ImageBackground>
        </Modal>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    listContainer: {
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    itemImage: {
      width: 64,
      height: 64,
      borderRadius: 32,
      marginRight: 12,
    },
    itemInfo: {
      flex: 1,
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    itemPrice: {
      fontSize: 16,
      color: 'gray',
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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'rgba(255,255,255,.91)',
      borderWidth: 1,
      borderColor: '#000',
      padding: 20,
      borderRadius: 8,
      width: '80%',
    },
    rowModalTitle: {

      width: '100%',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",

    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    modalX: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      color: "red"
    },
    modalInput: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginBottom: 12,
    },
    optionButton: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginBottom: 5,
    },
    selectedOption: {
      backgroundColor: 'rgba(0,0,0,0.9)',
    },
    optionText: {
      color: 'gray',
    },
    loadingBox: {

      backgroundColor: "#000",
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: '5%',
      width: "90%",
      height: 300,
      marginVertical: '1.5%',
      borderRadius: 20,
      borderColor: "#fff",
      borderWidth: 1,

    }
  });