import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LinearGradient from 'react-native-linear-gradient';
const backButtonImage = require('../assets/backbutton.png');
const backArrow = require('../assets/backward.png');
const forwardArrow = require('../assets/forward.png');
const backgroundImage1 = require('../assets/pathline.png');

const Top3Screen = ({navigation}) => {
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const storedTopScores = await AsyncStorage.getItem('topScores');
        const parsedTopScores = storedTopScores
          ? JSON.parse(storedTopScores)
          : [];

        const sortedTopScores = parsedTopScores.sort((a, b) => b - a);
        setTopScores(sortedTopScores);
        // setTopScores(parsedTopScores);
      } catch (error) {
        console.error('Error fetching top scores: ', error);
      }
    };

    fetchTopScores();
  }, []);
  console.log('aya', topScores);
  return (
    <LinearGradient
      colors={['#004', '#004', '#004', '#004', '#004', '#004']}
      style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Image source={backButtonImage} style={styles.backButtonImage} />
      </TouchableOpacity>
      <View style={styles.container}>

  {/* First Result */}
  <View style={styles.resultContainer}>
    <Image source={backArrow} style={styles.arrowImage} />
    <View style={styles.resultContainer_border}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={backgroundImage1}
          style={styles.backgroundImage}>
          <Text style={styles.scoreText}>{topScores.length > 0 ? topScores[0] : 0}</Text>
        </ImageBackground>
      </View>
    </View>
    <Image source={forwardArrow} style={styles.arrowImage} />
  </View>

  {/* Second Result */}
  <View style={styles.resultContainer}>
    <Image source={backArrow} style={styles.arrowImage} />
    <View style={styles.resultContainer_border}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={backgroundImage1}
          style={styles.backgroundImage}>
          <Text style={styles.scoreText}>{topScores.length > 1 ? topScores[1] : 0}</Text>
        </ImageBackground>
      </View>
    </View>
    <Image source={forwardArrow} style={styles.arrowImage} />
  </View>

  {/* Third Result */}
  <View style={styles.resultContainer}>
    <Image source={backArrow} style={styles.arrowImage} />
    <View style={styles.resultContainer_border}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={backgroundImage1}
          style={styles.backgroundImage}>
          <Text style={styles.scoreText}>{topScores.length > 2 ? topScores[2] : 0}</Text>
        </ImageBackground>
      </View>
    </View>
    <Image source={forwardArrow} style={styles.arrowImage} />
  </View>
        
   
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonImage: {
    width: 65,
    height: 65,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  resultContainer_border: {
    backgroundColor: '#1D4190',
    height: 90,
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#6080C4',
  },
  arrowImage: {
    width: 30, 
    height: 30, 
    marginHorizontal: 10,
  },
  backgroundImage: {
    width: 240, 
    height: 60, 
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center', 
  },
  scoreText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  score: {
    fontWeight: 'bold',
    color: 'white',
    flexDirection: 'row',
  },
});

export default Top3Screen;
