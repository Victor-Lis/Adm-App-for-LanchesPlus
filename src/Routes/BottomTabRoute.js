import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Feather from 'react-native-vector-icons/Feather';
import ItemsStack from './ItemsStack'
import PedidosScreen from '../Components/PedidosScreen';
import UserScreen from '../Components/UserScreen';

export default function BottomTabRoute({userUid, setUser}) {

 return (
    <Tab.Navigator>
        <Tab.Screen
            name="Lanches"
            component={ItemsStack}
            initialParams={{userUid: userUid}}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="home" color={color} size={size} />
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle:{

                    height: 50,
                    backgroundColor: "#000",
                    alignItems: "center",

                },
                tabBarIconStyle: {

                    height: 100,
                    width: 100,

                }
            }
        }
        />
        <Tab.Screen
            name="Pedidos"
            component={PedidosScreen}
            initialParams={{userUid: userUid}}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="clipboard" color={color} size={size} />
                },
                headerShown: true,
                headerStyle: {

                    backgroundColor: "rgba(0,0,0,1)",

                },
                headerTintColor: "#fff",
                tabBarShowLabel: false,
                tabBarStyle:{

                    height: 50,
                    backgroundColor: "#000",
                    alignItems: "center",

                },
                tabBarIconStyle: {

                    height: "80%"

                }
            }
        }
        />
        <Tab.Screen
            name="Usuário"
            component={UserScreen}
            initialParams={{userUid: userUid, setUser: setUser}}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="user" color={color} size={size} />
                },
                headerShown: true,
                headerStyle: {

                    backgroundColor: "rgba(0,0,0,1)",

                },
                headerTintColor: "#fff",
                tabBarShowLabel: false,
                tabBarStyle:{

                    height: 50,
                    backgroundColor: "#000",
                    alignItems: "center",

                },
                tabBarIconStyle: {

                    height: "80%"

                }
            }
        }
        />
    </Tab.Navigator>
  );
}