import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MenuScreen from '../screens/MenuScreen';
import SettingScreen from '../screens/SettingScreen';
import Top3Screen from '../screens/Top3Screen';
import StartScreen from '../screens/StartScreen';


const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="Top3Screen" component={Top3Screen} />
      <Stack.Screen name="StartScreen" component={StartScreen} />
    </Stack.Navigator>
  </NavigationContainer>
    
    // <View>
    //     <Splash/>
    //   {/* <Text>AppNavigator</Text> */}
    // </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
