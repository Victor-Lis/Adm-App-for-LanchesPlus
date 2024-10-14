import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, FlatList } from 'react-native';
import { BarCodeScanner, BarCodeSize } from 'expo-barcode-scanner';
import backgroundImage from "../Images/background2.png"
import ItemPedido from './ItemPedido';

import { Buffer } from 'node:buffer';

export default function PedidosScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [first, setFirst] = useState(true)
  const [pedido, setPedido] = useState([])
  let total = 0;
  const [cost, setCost] = useState(0)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);
  
  useEffect(() => {

    pedido.map((item) => {

      total += Number(item.preco)

    })

    setCost(total)

  }, [pedido])

  function handleNewScan(){

    setPedido([])
    setScanned(false)

  }

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);

    // console.log(data)
    const objetoDecodificado = Buffer.from(data, 'base64').toString()
    // const objetoDecodificado = atob(data);
    console.log(objetoDecodificado);
    const objetoJSONParse = JSON.parse(objetoDecodificado);
    setPedido(objetoJSONParse);
    setFirst(false);
  };

  if (hasPermission === null) {
    return <Text style={{marginTop: "10%", width: "100%", textAlign: "center", fontWeight: "bold", fontSize: 20, color: "red"}}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={{marginTop: "10%", width: "100%", textAlign: "center", fontWeight: "bold", fontSize: 20, color: "red"}}>No access to camera</Text>;
  }

  return (
    <ImageBackground style={styles.container} source={backgroundImage}>
     <View style={styles.contentContainer}> 
     {(!scanned || !pedido)?(
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.qrcode}
        />
     ):(

      <Button title={first? "Ler Pedido": 'Ler Novo Pedido'} style={styles.button} onPress={handleNewScan} />

     )}
     <FlatList

      data={pedido}
      renderItem={(item) => <ItemPedido data={item}/>}
      style={{width: "100%", marginTop: "10%", marginBottom: "5%"}}

     />
      <View style={styles.precoRow}>

        {!first && <Text style={styles.preco}> Total: R${cost} </Text>}

      </View>
     </View>
    </ImageBackground>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {

    width: "92.5%",
    height: "92%",
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: "10%",

  },
  qrcode: {

    resizeMode: 'cover',
    width: "100%",
    height: "100%",
    marginBottom: "10%"

  },
  button: {

    margin: "5%",

  },
  precoRow:{

    width: "97.5%",
    paddingHorizontal: "2.5%",
    height: "5%",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row"

  },
  preco:{

    color: "#008000",
    fontWeight: "bold",
    fontSize: 20,

  }
});