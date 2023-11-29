
import React ,{useEffect}from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const image1 = require('../assets/top3.png');
const image2 = require('../assets/startgame.png');
const settingsIcon = require('../assets/setting.png');
const backgroundImage = require('../assets/menu_bg.png');



const MenuScreen = ({ navigation }) => {


  return (
  //   <LinearGradient
  //   colors={['#004', '#004', '#004', '#004', '#004', '#004']}
  //   style={styles.container}
  // >
  <ImageBackground source={backgroundImage} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')} style={styles.settingsIcon}>
        <Image source={settingsIcon} style={styles.settingsIconImage} />
      </TouchableOpacity>

      <View style={styles.centerContent}>
        <TouchableOpacity onPress={() => navigation.navigate('Top3Screen')} style={styles.imageButton}>
          <Image source={image1} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('StartScreen')} style={styles.imageButton}>
          <Image source={image2} style={styles.image} />
        </TouchableOpacity>
      </View>
    {/* </LinearGradient> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  settingsIconImage: {
    width: 65,
    height: 65,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButton: {
    marginBottom: 20,
  },
  image: {
  
  },
});

export default MenuScreen;

