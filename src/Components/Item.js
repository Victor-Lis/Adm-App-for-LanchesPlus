import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Conexão com o banco
import { handleDelete } from '../Connections/firebaseConfig'

// Aplicação visual
import Feather from 'react-native-vector-icons/Feather'

export default function Item({data, index, setLoading, setProdutos, produtos}) {

 return (
   <View style={styles.container}> 

            <Image 
                style={[{ width: '100%', height: '85%', borderTopLeftRadius: 20, borderTopRightRadius: 20, }, styles.image]} 
                source={{uri: data.imagem}}
                resizeMode="contain"
            />

        <View style={styles.row}>

            <Text style={{color: '#fff'}}> R${data.preco} </Text>
            <Text style={{color: '#fff'}}> {data.nome} </Text>
            <Text style={{color: '#fff'}}> {data.tipo} </Text>
            <TouchableOpacity onPress={() => handleDelete(setLoading, setProdutos, produtos, index)}>

                <Feather name='trash' color={'red'} size={20}/>

            </TouchableOpacity>

        </View>

   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 5,
        marginHorizontal: '5%',
        width: "90%",
        height: 300,
        marginVertical: '1.5%',
        borderRadius: 20,
        borderColor: "#fff",
        borderWidth: 1,
    },
    row: {

        width: '100%',
        height: '15%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",   
        borderColor: "#fff",
        borderTopWidth: 1,

    },
    image: {

        backgroundColor: 'rgba(40,5,255, .2)',

    }
});