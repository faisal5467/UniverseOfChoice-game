import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Vibration,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
const backButtonImage = require('../assets/backbutton.png');
const soundBackgroundImage = require('../assets/backimagetoggle.png');
const soundOnImage = require('../assets/on.png');
const soundOffImage = require('../assets/off.png');
const vibrationBackgroundImage = require('../assets/backimagetoggle.png');
const vibrationOnImage = require('../assets/on.png');
const vibrationOffImage = require('../assets/off.png');

const SettingsScreen = ({navigation}) => {
  const [isSoundOn, setSoundOn] = useState(false);
  const [isVibrationOn, setVibrationOn] = useState(false);

  const soundAnimation = useRef(new Animated.Value(isSoundOn ? 0 : 1)).current;
  const vibrationAnimation = useRef(
    new Animated.Value(isVibrationOn ? 0 : 1),
  ).current;
  /////////////////////////

  const sound = new Sound('sound.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        sound.getDuration() +
        'number of channels: ' +
        sound.getNumberOfChannels(),
    );
  });

  // ///////////////////////////
  const toggleSound = async () => {
    // Toggle the sound state
    const newSoundState = !isSoundOn;
    setSoundOn(newSoundState);
  
    // Save the updated sound state to AsyncStorage
    try {
      await AsyncStorage.setItem('isSoundOn', JSON.stringify(newSoundState));
    } catch (error) {
      console.error('Error saving sound state: ', error);
    }
  
    Animated.timing(soundAnimation, {
      toValue: newSoundState ? 0 : 1, // Change this line
      duration: 300,
      useNativeDriver: true,
    }).start();
  
    // Play or stop the sound based on the updated isSoundOn state
    if (newSoundState) {
      sound.play();
    } else {
      sound.stop();
    }
  };
  

  useEffect(() => {
    const fetchSoundState = async () => {
      try {
        // Retrieve the sound state from AsyncStorage
        const storedSoundState = await AsyncStorage.getItem('isSoundOn');
        const vibrationState = await AsyncStorage.getItem('isVibrationOn');
        setSoundOn(storedSoundState !== null ? JSON.parse(storedSoundState) : true);
        setVibrationOn(vibrationState ? JSON.parse(vibrationState) : true);
      } catch (error) {
        console.error('Error fetching sound state: ', error);
      }
    };
  
    fetchSoundState();
  }, []);
  
const toggleVibration = async () => {
  // Toggle the vibration state
  setVibrationOn((prevVibration) => !prevVibration);

  // Save the updated vibration state to AsyncStorage
  try {
    await AsyncStorage.setItem('isVibrationOn', JSON.stringify(!isVibrationOn));
  } catch (error) {
    console.error('Error saving vibration state: ', error);
  }

  Animated.timing(vibrationAnimation, {
    toValue: isVibrationOn ? 1 : 0,
    duration: 300,
    useNativeDriver: false,
  }).start();
};
  const soundImageTranslateX = soundAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const vibrationImageTranslateX = vibrationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleButtonPress = () => {
    // Vibrate if vibration is enabled
    if (isVibrationOn) {
      Vibration.vibrate();
    }

  };

  return (
    <LinearGradient
      colors={['#004', '#004', '#004', '#004', '#004', '#004']}
      style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Image source={backButtonImage} style={styles.backButtonImage} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.content_two_box}>
          <Text style={styles.settingText}>SOUND</Text>
          <View style={styles.content_back_border}>
            <TouchableOpacity onPress={toggleSound} style={styles.toggleButton}>
              <Image
                source={soundBackgroundImage}
                style={styles.backgroundImage}
              />
              <Animated.Image
                source={isSoundOn ? soundOnImage : soundOffImage}
                style={[
                  styles.toggleImage,
                  {transform: [{translateX: soundImageTranslateX}]},
                ]}
              />
              {!isSoundOn && (
                <Animated.Text
                  style={[
                    styles.offText,
                    {transform: [{translateX: soundImageTranslateX}]},
                  ]}>
                  OFF
                </Animated.Text>
              )}
              {isSoundOn && <Text style={[styles.onText]}>ON</Text>}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content_two_box}>
          <Text style={styles.settingText}>VIBRATION</Text>
          <View style={styles.content_back_border}>
            <TouchableOpacity
              onPress={() => {
                toggleVibration();
                handleButtonPress();
              }}
              style={styles.toggleButton}>
              <Image
                source={vibrationBackgroundImage}
                style={styles.backgroundImage}
              />
              <Animated.Image
                source={isVibrationOn ? vibrationOnImage : vibrationOffImage}
                style={[
                  styles.toggleImage,
                  {transform: [{translateX: vibrationImageTranslateX}]},
                ]}
              />
              {!isVibrationOn && (
                <Animated.Text
                  style={[
                    styles.offText,
                    {transform: [{translateX: vibrationImageTranslateX}]},
                  ]}>
                  OFF
                </Animated.Text>
              )}
              {isVibrationOn && <Text style={[styles.onText]}>ON</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 200,
    width: '50%',
  },
  content_two_box: {
    height: 190,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content_back_border: {
    backgroundColor: '#1D4190',
    height: 90,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#6080C4',
  },
  settingText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 5,
  },
  toggleButton: {
    position: 'relative',
  },
  backgroundImage: {
    width: 110,
    height: 45,
    borderRadius: 15,
  },
  toggleImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 45,
    height: 45,
  },
  offText: {
    position: 'absolute',
    top: 3,
    right: 10,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  onText: {
    position: 'absolute',
    top: 3,
    right: 15,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
