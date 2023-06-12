import { View, Text, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import React from 'react'

import Item from './Item';

export default function RenderItems({loading, titulo, produtos, tipo, setModalVisible, setDatasToEdit, setIndexToEdit, setSelectedImage, setLoading, setProdutos, setEditBoolean}) {
    
    if(!loading){
            
      return(

        <View style={styles.box}>

          <Text style={styles.title}> {titulo} </Text>

          {produtos && produtos.map((data, index) => {

            if(data.tipo === tipo){

              return <Item key={index} data={data} produtos={produtos} index={index} setModalVisible={setModalVisible} setDatasToEdit={setDatasToEdit} setIndexToEdit={setIndexToEdit} setSelectedImage={setSelectedImage} setLoading={setLoading} setProdutos={setProdutos} setEditBoolean={setEditBoolean}/>

            }

          })}

        </View>

      )

    }else{

      return(

          <View style={styles.loadingBox}>

            <Feather name="loader" size={30} color="#fff"/>

          </View> 

      )

    }
}


const styles = StyleSheet.create({
    loadingBox: {

      width: "100%",
      justifyContent: "center",
      alignItems: "center"

    },
    title: {

        textAlign: "left",
        width: "95%",
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: "1%",
        color: "#fff"

    },
    box: {

        marginTop: "8.5%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",

    }
});