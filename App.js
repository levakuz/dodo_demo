/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import FranchiseScreen from './src/screens/franchisescreen'
import DodoScreen from './src/screens/DodoScreen'
import DodoOrderScrenn from './src/screens/DodoOrderSrceen'
import DodoOrderScreenQR from './src/screens/DodoQRScreen'
import DodoAwaitRobot from './src/screens/DodoAwaitRobot'
import DodoThx from './src/screens/ThxDodoScreen'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function Navigate(){
  return(
  <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name = "Выбор франшизы" component={FranchiseScreen}
        options={{
          title: 'Выбор франшизы',
          headerStyle:{
            backgroundColor:'#212021'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
        />
        <Stack.Screen name = "Додо Пицца" component={DodoScreen}
        options={{
          title: 'Додо Пицца',
          headerStyle:{
            backgroundColor:'#212021'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
        />
        <Stack.Screen name = "Додо Пицца Заказ" component={DodoOrderScrenn}
        options={{
          title: 'Заказать доставку роботом',
          headerStyle:{
            backgroundColor:'#212021'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
        />
        <Stack.Screen name = "Додо Пицца QR" component={DodoOrderScreenQR}
        options={{
          title: 'Сканирование стола',
          headerStyle:{
            backgroundColor:'#212021'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
        />
        <Stack.Screen name = "Додо Пицца Ожидание робота" component={DodoAwaitRobot}
          options={{
          title: 'Ожидание робота',
          headerStyle:{
            backgroundColor:'#212021'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
        />
        <Stack.Screen name = "Додо Пицца Благодарность" component={DodoThx}
          options={{
          title: 'Ожидание робота',
          headerStyle:{
            backgroundColor:'#212021'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
        />

        

      </Stack.Navigator>
  </NavigationContainer>
  );
}





