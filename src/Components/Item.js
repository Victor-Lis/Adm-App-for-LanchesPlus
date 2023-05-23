import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { app } from '../Connections/firebaseConfig'
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default function Item({data, index, handleDelete}) {

 return (
   <View style={styles.container}> 

            <Image style={{ width: '100%', height: '85%', borderTopLeftRadius: 20, borderTopRightRadius: 20, }} source={{uri: data.imagem}}/>

        <View style={styles.row}>

            <Text style={{color: '#fff'}}> R${data.preco} </Text>
            <Text style={{color: '#fff'}}> {data.nome} </Text>
            <Text style={{color: '#fff'}}> {data.tipo} </Text>
            <TouchableOpacity onPress={() => handleDelete(index)}>

                <Text style={{color: 'red'}}> X </Text>

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

    }
});