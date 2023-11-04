
# Adm App Laches+

Esse é o primeiro projeto na qual integrei mais de uma aplicação ao mesmo banco de dados, no caso foi um App e um Site, sendo esse o app. O projeto em si consiste em um App para Administradores em um sistema de loja de comidas / fast-food.



## Desafios

Acredito que meus principais desafios nesse projeto foram:
- Uma das primeiras vezes usando a lib @react-navigation, inclusive trabalhando com sistemas de navegação diferentes.
- Uma das primeiras vezes usando a lib @react-native-async-storage/async-storage.
- Primeira vez usando a lib expo-image-picker.
- Uma das primeiras vezes usando blob em JS.
- Primeira vez usando o módulo "Storage" do Firebase (firebase/storage).

## Aprendizados

Por final aprendi algumas coisas interessantes como: 


#### Usando a navegação Bottom-Tabs da lib @react-navigation/bottom-tabs
Aproveitando, uma das Tab.Screens é a "ItemsStack", que na verdade é a integração com outros sistema de navegação o "Stack Navigation".
```javascript
return (
    <Tab.Navigator>
        <Tab.Screen
            name="Lanches"
            component={ItemsStack}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="home" color={color} size={size} />
                },
            }
        />
        <Tab.Screen
            name="Pedidos"
            component={PedidosScreen}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="clipboard" color={color} size={size} />
                },
            }
        />
        <Tab.Screen
            name="Usuário"
            component={UserScreen}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="user" color={color} size={size} />
                },
            }
        />
    </Tab.Navigator>
)
```

#### Usando a navegação Native-Stack da lib @react-navigation/native-stack
```javascript
return (
  <Stack.Navigator>
    <Stack.Screen
      component={Items}
      name="Lanches+"
      options={{
        headerShown: true,
      }}
    />
    <Stack.Screen
      component={NewProduct}
      name="Novo Lanche"
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);
```

#### Usar a lib expo-image-picker
```javascript
import * as ImagePicker from 'expo-image-picker';

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
    setSelectedImage(result.assets[0].uri);
    setImage(result.assets[0].uri, setProduto)
  }
};
```

#### Usar useEffect() + AsyncStorage para sistema de login
Igual na versão web, utilizei o armazenamento local para montar um sistema de login. Aproveitando para ressaltar, na época ainda não conhecia o useContext(), então passava props de componente em componente.

```javascript
async function getUserUid(){

  let userid = await AsyncStorage.getItem('@useruid')
    
  if(userid){

    setUser(userid)

  }

}

useEffect(() => {

  getUserUid()

}, [])
```


#### Usando Blob + Storage do Firebase
Na função abaixo recebo um URI vinda da lib já mencionada e exemplificada acima expo-image-picker 

```javascript
async function setImage(uri, setProduto){

  const storage = getStorage(app);
  const ext = uri.substring(uri.lastIndexOf("."))
  let currentDate = new Date()
  let imageName = currentDate.valueOf()
  const storageRef = storageref(storage, `images/${imageName}${ext}`)
  const metadata = {
    contentType: `${ext}`,
  };

  const res = await fetch(uri)
  const blob = await res.blob()
  await uploadBytes(storageRef, blob, metadata).then(async (snapshot) => {
    getDownloadURL(storageRef)
      .then((url) => {
        setProduto((prevProduct) => ({ ...prevProduct, imagem: `${url}` }))
      })
      .catch((error) => console.log('Erro ao obter URL da imagem:', error));
  });

}
```

# React Laches+

![Login](https://github.com/Victor-Lis/Adm-App-for-LanchesPlus/tree/blob/master/src/Screenshots/Login.jpg)

![Home](https://github.com/Victor-Lis/Adm-App-for-LanchesPlus/tree/blob/mmaster/src/Screenshots/Home.jpg)

![Home 2](https://github.com/Victor-Lis/Adm-App-for-LanchesPlus/tree/blob/mmaster/src/Screenshots/Home%202.jpg)

![Home Edit](https://github.com/Victor-Lis/Adm-App-for-LanchesPlus/tree/blob/master/src/Screenshots/Home%20Edit.jpg)

![Modal](https://github.com/Victor-Lis/Adm-App-for-LanchesPlus/tree/blob/master/src/Screenshots/Modal.jpg)

![User](https://github.com/Victor-Lis/Adm-App-for-LanchesPlus/tree/blob/master/src/Screenshots/User.jpg)

## Mais

 - [Site](https://github.com/Victor-Lis/React-LanchesPlus)


## Autores

- [@Victor-Lis](https://github.com/Victor-Lis)

