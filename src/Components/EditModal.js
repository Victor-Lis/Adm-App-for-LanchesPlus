import { Text, Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function EditModal({ visible, setVisible, title, data, index, setModalVisible, setDatasToEdit, setIndexToEdit, setSelectedImage, setEditBoolean}) {

  function handleEdit(){

    setIndexToEdit(index)
    setDatasToEdit(data)
    setSelectedImage(data.imagem)
    setEditBoolean(true)
    setModalVisible(true)
    setVisible(false)

  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <View style={styles.rowTitle}>

            <Text style={styles.title}> {title} </Text>
          
          </View>
            <Text style={styles.text}> Edição é uma ação irreversivel, tem certeza que deseja continuar? </Text>

            <View style={styles.buttonsRow}>

              <TouchableOpacity style={[styles.button, {backgroundColor: "red"}]} onPress={() => setVisible(false)}>

                <Text style={{color: "#fff"}}> Não </Text>

              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, {backgroundColor: "green"}]} onPress={() => handleEdit()}>

                <Text style={{color: "#fff"}}> Sim </Text>

              </TouchableOpacity>

            </View>
          
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85 %',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
  },
  rowTitle:{

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,

  },
  title: {

    fontSize: 17.5,
    fontWeight: "bold",
    textAlign: 'center'

  },
  text:{

    marginTop: 15,
    width: '100%',
    paddingHorizontal: '0%',
    textAlign: "center"

  },
  buttonsRow:{

    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 10,

  },
  button: {

    paddingVertical: 10,
    width: "30%",
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 5,
    elevation: 2,

  }
});