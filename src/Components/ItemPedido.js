import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ItemPedido({data}) {

 return (
   <View style={styles.container}> 

    <View style={styles.leftColumn}>

        <Image style={styles.image} source={{uri: data.item.imagem}}/>
        <Text style={styles.preco}> R${data.item.preco} </Text>

    </View>
    <View style={styles.rightColumn}> 

        <Text style={styles.title}> {data.item.nome} </Text>

        <Text style={styles.desc}> {data.item.descricao} </Text>

        <Text style={styles.desc}> {data.item.ingredientes} </Text>

    </View>

   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: "90%",
        paddingRight: "2.5%",
        backgroundColor: 'rgba(255,255,255,.9)',
        marginVertical: 3,
        borderRadius: 10,
        flexDirection: "row",
        paddingVertical: "1.5%",
        elevation: 5,
        marginHorizontal: "5%",
    },
    leftColumn: {

        flex: 1.75,
        // backgroundColor: "red",
        alignItems: "center",
        justifyContent: "space-around"

    },
    rightColumn: {

        flex: 2.25,
        // backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "space-around",

    },
    image: {

        resizeMode: "contain",
        height: "55%",
        width: "100%"

    },
    preco: {

        fontSize: 15,
        color: "#008000"

    },
    title: {

        fontSize: 17.5,
        fontWeight: "bold",
        width: "100%",
        textAlign: 'center'

    },
    desc:{
        
        fontSize: 12,
        textAlign: "center",

    },
    iconsRow:{

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "95%",
        // backgroundColor: "red",

    }
});