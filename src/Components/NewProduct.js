import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet
} from 'react-native';

// Conexão com o banco
import { handleAdd, handleEdit } from '../Connections/firebaseConfig';

// Aplicação visual
import backgroundImage2 from "../Images/background3.png"
import Feather from 'react-native-vector-icons/Feather'

export default function NewProduct({modalVisible, selectedImage, selectImage, setProduto, produto, loading, handleClose, setLoading, setProdutos, produtos, index, editBoolean, setEditBoolean}){
  
  function handleUse(){

    if(produto && editBoolean){

      handleEdit(setLoading, setProdutos, handleClose, produtos, index, produto, setProduto)

    }else{

      handleAdd(setLoading, setProdutos, produto, handleClose, setProduto)
    
    }

    setEditBoolean(false)

  }

  function handleCloseModal(){

    setProduto({
    
      nome: "",
      preco: "",
      tipo: "L",
      imagem: ""
      
    })
    handleClose()

  }

 return (
    <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => handleClose()}
    >
        <ImageBackground style={styles.modalContainer} source={backgroundImage2}>
          <ScrollView
            vertical={true}
            contentContainerStyle={[selectedImage? {alignItems: "center", justifyContent: "center", height: 1100}: {alignItems: "center", justifyContent: "center", height: 800}]}
          >
           <View style={styles.modalContent}>

            <View style={styles.rowModalTitle}>

                <TouchableOpacity onPress={handleCloseModal}>
          
                    <Feather name='x' color={'red'} size={35}/>

                </TouchableOpacity> 

            </View>

              <Text style={[styles.modalTitle]}>Adicionar Produto</Text>

              <Text style={styles.subTitle}>Imagem</Text>

            {selectedImage &&
                <View style={styles.modalImageBox}>
                    <Image
        
                        source={{uri: selectedImage}}
                        style={[styles.modalImage]}
                        resizeMode="contain"

                    />
                </View>
            } 

            <TouchableOpacity
                style={!selectedImage? [styles.optionButton, {justifyContent: "flex-start", marginBottom: 12}]: [styles.optionButton, {justifyContent: "flex-start", marginBottom: 12,backgroundColor: 'rgba(0,0,0,0.9)',}]}
                onPress={selectImage}
            >

                <Text style={selectedImage? [styles.optionText, {color: 'rgba(255,255,255,.91)'}]: styles.optionText}>Selecione uma imagem {selectedImage && <Feather name='check-circle' color={'rgba(255,255,255,.91)'}/>}</Text>

            </TouchableOpacity>

            <Text style={styles.subTitle}>Informações</Text>
      
            <TextInput
                style={[styles.modalInput, {marginBottom: 5}]}
                placeholder="Nome"
                onChangeText={(text) =>
                    setProduto((prevProduct) => ({ ...prevProduct, nome: text }))
                }
                value={produto.nome}
                maxLength={20}
            />
            <TextInput
                style={[styles.modalInput, {marginBottom: 5}]}
                placeholder="Preço"
                onChangeText={(text) =>
                    setProduto((prevProduct) => ({ ...prevProduct, preco: text.replace("-", "") }))
                }
                value={produto.preco}
                keyboardType='numeric'
            />

            <TextInput
                style={[styles.modalInput, {marginBottom: 5}]}
                placeholder="Ingredientes"
                onChangeText={(text) =>
                    setProduto((prevProduct) => ({ ...prevProduct, ingredientes: text }))
                }
                value={produto.ingredientes}
            />

            <TextInput
                style={styles.modalInput}
                placeholder="Descrição"
                onChangeText={(text) =>
                    setProduto((prevProduct) => ({ ...prevProduct, descricao: text }))
                }
                value={produto.descricao}
            />

            <Text style={styles.subTitle}>Tipo</Text>

            <TouchableOpacity
              style={[styles.optionButton, produto.tipo === 'L' && styles.selectedOption]}
              onPress={() => setProduto((prevProduct) => ({ ...prevProduct, tipo: 'L' }))}
            >
                <Text style={produto.tipo === 'L'? [styles.optionText, {color: 'rgba(255,255,255,.91)'}]: styles.optionText}> Lanche {produto.tipo === 'L' && <Feather name='check-circle' color={'rgba(255,255,255,.91)'}/>}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.optionButton, produto.tipo === 'A' && styles.selectedOption]}
                onPress={() => setProduto((prevProduct) => ({ ...prevProduct, tipo: 'A' }))}
            >
                <Text style={produto.tipo === 'A'? [styles.optionText, {color: 'rgba(255,255,255,.91)'}]: styles.optionText}>Acompanhamento {produto.tipo === 'A' && <Feather name='check-circle' color={'rgba(255,255,255,.91)'}/>}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.optionButton, produto.tipo === 'R' && styles.selectedOption]}
                onPress={() => setProduto((prevProduct) => ({ ...prevProduct, tipo: 'R' }))}
            >
                <Text style={produto.tipo === 'R'? [styles.optionText, {color: 'rgba(255,255,255,.91)'}]: styles.optionText}> Refrigerante {produto.tipo === 'R' && <Feather name='check-circle' color={'rgba(255,255,255,.91)'}/>}</Text>
            </TouchableOpacity>

            <Button style={{marginBottom: 50}} title={loading? "Carregando...": "Adicionar"} onPress={() => handleUse()} disabled={loading}/>
           </View>
          </ScrollView>
        </ImageBackground>
    </Modal>
  );
}


const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subTitle: {

      textAlign: "left",
      marginVertical: 10,
      fontWeight: "bold",
      fontSize: 18.5,
      color: "rgba(0,0,0,0.8)"

    },
    modalContent: {
      backgroundColor: 'rgba(255,255,255,.91)',
      borderWidth: 1,
      borderColor: '#000',
      padding: 20,
      borderRadius: 8,
      width: '90%',
    },
    rowModalTitle: {

      width: '100%',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      textAlign: "center",

    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    modalX: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      color: "red"
    },
    modalImageBox:{

        height: "25%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 5,

    },
    modalImage: {

        height: "100%",
        width: "65%",

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

        color: "gray"

    }
});