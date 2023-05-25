import React from 'react';
import {
  View,
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
import { handleAdd } from '../Connections/firebaseConfig';

// Aplicação visual
import backgroundImage2 from "../Images/background3.png"
import Feather from 'react-native-vector-icons/Feather'

export default function NewProduct({modalVisible, selectedImage, selectImage, setProduto, produto, loading, handleClose, setLoading, setProdutos}) {
 return (
    <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => handleClose()}
    >
        <ImageBackground style={styles.modalContainer} source={backgroundImage2}>
          <View style={styles.modalContent}>

            <View style={styles.rowModalTitle}>

                <TouchableOpacity onPress={() => handleClose()}>
          
                    <Feather name='x-circle' color={'red'} size={25}/>

                </TouchableOpacity> 

            </View>

                <Text style={[styles.modalTitle]}>Adicionar Produto</Text>

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
                style={styles.modalInput}
                placeholder="Preço"
                onChangeText={(text) =>
                    setProduto((prevProduct) => ({ ...prevProduct, preco: text.replace("-", "") }))
                }
                value={produto.preco}
                keyboardType='numeric'
            />

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

            <Button title={loading? "Carregando...": "Adicionar"} onPress={() => handleAdd(setLoading, setProdutos, produto, handleClose, setProduto)} disabled={loading}/>
          </View>
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