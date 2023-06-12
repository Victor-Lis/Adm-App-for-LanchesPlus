import React, {useState, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Items from '../Components/Items';
import NewProduct from '../Components/NewProduct';

export default function ItemsStack({route}) {

  const [user, setUser] = useState(route.params?.userUid)

  return (
    <Stack.Navigator>
        <Stack.Screen
        
            component={Items}
            initialParams={{userUid: user}}
            name="Lanches+"
            options={{
                headerShown: true,
                headerStyle: {

                    backgroundColor: "rgba(0,0,0,1)",

                },
                headerTintColor: "#fff"
            }}

        />
        <Stack.Screen
        
            component={NewProduct}
            initialParams={{userUid: user}}
            name="Novo Lanche"
            options={{
                headerShown: true,
            }}

        />
    </Stack.Navigator>
  );
}