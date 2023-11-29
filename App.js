import { StyleSheet, Text, View, StatusBar, Platform  } from 'react-native'
import React, {useEffect, useState} from 'react'


import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MenuScreen from './src/screens/MenuScreen';
import SettingScreen from './src/screens/SettingScreen';
import Top3Screen from './src//screens/Top3Screen';
import StartScreen from './src/screens/StartScreen';

const Stack = createStackNavigator();
const App = () => {

  useEffect(() => {
    StatusBar.setHidden(true);



   
  }, []);
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="MenuScreen" screenOptions={{headerShown:false}}>
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="Top3Screen" component={Top3Screen} />
      <Stack.Screen name="StartScreen" component={StartScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})