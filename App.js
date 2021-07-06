import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {StyleSheet} from 'react-native'

import ListarConsultas from './src/screens/ListarConsultas.js'
import Login from './src/screens/login.js'

const AuthStack = createStackNavigator()

export default function Stack(){
  return(
    <NavigationContainer>
      <AuthStack.Navigator headerMode='none' initialRouteName={AsyncStorage.getItem('jwt_key') !== undefined ? 'Login' : 'Main'} >
        <AuthStack.Screen name = 'Login' component={Login} />
        <AuthStack.Screen name = 'ListarConsultas' component={ListarConsultas} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}