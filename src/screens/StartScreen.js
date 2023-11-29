
import React, { useState, useRef, useEffect } from 'react';
import {View, Text, ImageBackground, Image, StyleSheet, PanResponder,Modal, TouchableOpacity, Alert  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Replace these with your actual image paths
const backgroundImage = require('../assets/runninggame_bg.png');
const element1Image = require('../assets/threepanel.png');
const element2Image = require('../assets/firebtn.png');
const element3Image = require('../assets/boostbtn.png');
const bombImage = require('../assets/bomb.png');
const shootImage = require('../assets/redshoot.png');
const boostImage = require('../assets/boost.png');
const fireImage = require('../assets/fire.png');
const settingsIcon = require('../assets/box-bg.png');
const heartpathline = require('../assets/pathline.png');

const heartImages = [
  require('../assets/heart1.png'),
  require('../assets/heart1.png'),
  require('../assets/heart1.png'),
  require('../assets/heart1.png'),
  require('../assets/heart1.png'),
];

const emptyHeartImage = require('../assets/emptyheart.png');

const StartScreen = ({navigation}) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const panelRef = useRef();
  const [fallingElements, setFallingElements] = useState([]);
  const [topScores, setTopScores] = useState([])

  ////////////////////////// save top score

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const { moveX } = gestureState;
      if (panelRef.current) {
        panelRef.current.setNativeProps({ style: { left: moveX - 50 } });
        checkForCollisions(moveX);
      }
    },
  });

// /////////////////////////////////////////////////////////// bomb agr laga to

const checkForCollisions = (panelX) => {
  const panelBounds = { left: panelX - 50, right: panelX + 50 };

  setFallingElements((prevElements) =>
    prevElements.map((element) => {
      const elementBounds = {
        left: element.left,
        right: element.left + 50, 
        top: element.top,
        bottom: element.top + 50, 
      };

      const isCollision =
        element.falling &&
        panelBounds.left < elementBounds.right &&
        panelBounds.right > elementBounds.left &&
        elementBounds.bottom > 550; // mein Adjust kr raha this value based on your panel position

      if (isCollision) {
    
        handleElementCatch(element.type);
      }

      return isCollision ? { ...element, falling: false } : element;
    })
  );
};

const handleElementCatch = (elementType) => {
  if (gameOver) {
    saveScoreAndGameOver(score);
    return; // agr to (If the game is over, do not handle further element catches)
  }

  switch (elementType) {
    case 'fire':
    case 'boost':
    case 'shoot':
      setScore((prevScore) => prevScore + 1);
      break;
    case 'bomb':
        setLives((prevLives) => {
          const newLives = prevLives - 1;
          if (newLives === 0) {
            setGameOver(true);
          }
          return newLives;
        });
      // }
      break;
    default:
      break;
  }
};

// //////////// ye score ko sae kry ga... for save score in local storage

const saveScoreAndGameOver = async (finalScore) => {
  // Save the score
  await saveScore(finalScore);
  setGameOver(true);
};

const saveScore = async (finalScore) => {
  try {
    const existingTopScores = await AsyncStorage.getItem('topScores');
    const topScores = existingTopScores ? JSON.parse(existingTopScores) : [];
    topScores.push(finalScore);
    const sortedTopScores = topScores.sort((a, b) => b - a);
    await AsyncStorage.setItem('topScores', JSON.stringify(sortedTopScores));
  } catch (error) {
    console.error('Error saving score: ', error);
  }
};
// ///////////////////////// save score end hai
  // //////////////////////////////////////////////////////////////////////
  useEffect(() => {
    let animationFrameId;
  
    const updateFallingElements = () => {
      if (gameOver) {
        return;
      }
      setFallingElements((prevElements) =>
        prevElements.map((element) => ({
          ...element,
          top: element.falling ? element.top + 5 : element.top,
        }))
      );
  
      animationFrameId = requestAnimationFrame(updateFallingElements);
    };
  
    animationFrameId = requestAnimationFrame(updateFallingElements);
  
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameOver]);
  
  useEffect(() => {
    const generateNewElement = () => {
      if (gameOver) {
        return;
      }
      const newElement = generateRandomElement();
      setFallingElements((prevElements) => [...prevElements, newElement]);
    };

    const fallingGenerator = setInterval(generateNewElement, 2000); // Adjust the interval based on your preference

    return () => {
      clearInterval(fallingGenerator);
    };
  }, [gameOver]);

  const generateRandomElement = () => {
    const types = ['bomb', 'shoot', 'boost', 'fire'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    return {
      type: randomType,
      top: 0,
      left: Math.random() * 800, // yar Adjust the range based on your design
      falling: true,
    };
  };

    const getImageByType = (type) => {
    switch (type) {
      case 'bomb':
        return bombImage;
      case 'shoot':
        return shootImage;
      case 'boost':
        return boostImage;
      case 'fire':
        return fireImage;
      default:
        return null;
    }
  };
  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
       
      <View onPress={() => navigation.navigate('SettingScreen')} style={styles.settingsIcon}>
        {/* <Image source={settingsIcon} style={styles.settingsIconImage} /> */}
        <ImageBackground source={settingsIcon} style={styles.settingsIconImage}>
          <Text style={styles.scoreText}> {score}</Text>
        </ImageBackground>
      </View>

      <View onPress={() => navigation.navigate('SettingScreen')} style={styles.heartlineIcon}>

        <ImageBackground source={heartpathline} style={styles.heartlineImage}>
        <View style={styles.livesContainer}>
     
     {heartImages.map((heart, index) => (
       <Image key={index} source={index < lives ? heart : emptyHeartImage} style={styles.heartImage} />
     ))}
   </View>
        </ImageBackground>
      </View>

      {/* Panel for catching elements */}
      <View ref={panelRef} style={styles.panel} {...panResponder.panHandlers}>
      <Image source={element1Image} style={styles.elementImage} />
      </View>
   {/* Falling Elements */}
   {fallingElements.map((element, index) => (
        <Image
          key={index}
          source={getImageByType(element.type)}
          style={{
            ...styles.fallingElement,
            top: element.top,
            left: element.left,
          }}
        />
      ))}

       {/*ye serf Game Over Modal */}
       <Modal transparent={true} animationType="slide" visible={gameOver}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Game Over! Total Score: {score}</Text>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => {
                setGameOver(false);
                setScore(0);
                setLives(5);
                navigation.goBack()
              }}
            >
              <Text style={styles.menuButtonText}>Return to Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  settingsIconImage: {
    width: 90,
    height: 90,
  },
  heartlineIcon: {
    position: 'absolute',
    top: 20,
    left: 2,
    borderRadius:20
  },
  heartlineImage: {
    width: 200,
    height: 45,
    borderRadius:20,
    paddingTop:8

  },
  scoreText: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'bold',
    position: 'absolute',
    top: 32,
    right: 30,
    textAlign:'center',

  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  // scoreText: {
  //   color: '#fff',
  //   fontSize: 20,
  // },
  livesText: {
    color: '#fff',
    fontSize: 20,
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
  },
  fallingElement: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
   // Styles for the heart images
   livesContainer: {
    flexDirection: 'row',
  },
  heartImage: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
    // Styles for the Game Over Modal
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
    },
    menuButton: {
      backgroundColor: '#3498db',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    menuButtonText: {
      color: '#fff',
      fontSize: 16,
    },
});

export default StartScreen;
