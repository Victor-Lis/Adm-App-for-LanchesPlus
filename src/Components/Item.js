import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Aplicação visual
import Feather from 'react-native-vector-icons/Feather'
import EditModal from './EditModal';
import DelModal from './DelModal';

export default function Item({data, produtos, index, setModalVisible, setDatasToEdit, setIndexToEdit, setSelectedImage, setLoading, setProdutos, setEditBoolean}) {

    const [editModal, setEditModal] = useState(false)
    const [delModal, setDelModal] = useState(false)

 return (
   <View style={styles.container}> 

    <View style={styles.leftColumn}>

        <Image style={styles.image} source={{uri: data.imagem}}/>
        <Text style={styles.preco}> R${data.preco} </Text>

    </View>
    <View style={styles.rightColumn}> 

        <Text style={styles.title}> {data.nome} </Text>

        <Text style={styles.desc}> {data.descricao} </Text>

        <Text style={styles.desc}> {data.ingredientes} </Text>

        <View style={styles.iconsRow}>

            <TouchableOpacity onPress={() => setEditModal(!editModal)}>

                <Feather name="edit-2" size={23} color="#DBD200" style={{marginRight: 10,}} />

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setDelModal(!delModal)}>

                <Feather name="x" size={30} color="#FF0000"/>

            </TouchableOpacity>

        </View>

    </View>

    <EditModal visible={editModal} setVisible={setEditModal} title={data.nome} produtos={produtos} index={index} setModalVisible={setModalVisible} setDatasToEdit={setDatasToEdit} setIndexToEdit={setIndexToEdit} data={data} setSelectedImage={setSelectedImage} setEditBoolean={setEditBoolean}/>
    <DelModal visible={delModal} setVisible={setDelModal} title={data.nome} produtos={produtos} index={index} setLoading={setLoading} setProdutos={setProdutos}/>

   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: "90%",
        paddingRight: "2.5%",
        backgroundColor: 'rgba(255,255,255,.9)',
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: "row",
        paddingVertical: "1.5%",
        elevation: 5
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