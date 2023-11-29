
// // import React, { useState, useRef , useEffect} from 'react';
// // import { View, Text, ImageBackground, Image, StyleSheet, PanResponder } from 'react-native';

// // // Replace these with your actual image paths
// // const backgroundImage = require('../assets/runninggame_bg.png');
// // const element1Image = require('../assets/shootbtn.png');
// // const element2Image = require('../assets/firebtn.png');
// // const element3Image = require('../assets/boostbtn.png');
// // const bombImage = require('../assets/bomb.png');
// // const shootImage = require('../assets/redshoot.png');
// // const boostImage = require('../assets/boost.png');
// // const fireImage = require('../assets/fire.png');

// // const StartScreen = () => {
// //   const [score, setScore] = useState(0);
// //   const [lives, setLives] = useState(5);
// //   const panelRef = useRef();

// //   const panResponder = PanResponder.create({
// //     onStartShouldSetPanResponder: () => true,
// //     onMoveShouldSetPanResponder: () => true,
// //     onPanResponderMove: (event, gestureState) => {
// //       // const { moveX } = gestureState;
// //       // if (panelRef.current) {
// //       //   panelRef.current.setNativeProps({ style: { left: moveX - 50 } }); // Adjust width of the panel
// //       // }

// //       const { moveX } = gestureState;
// //       if (panelRef.current) {
// //         panelRef.current.setNativeProps({ style: { left: moveX - 50 } });
    
// //         // Check for collisions with falling elements
// //         const panelBounds = { left: moveX - 50, right: moveX + 50 };
// //         setFallingElements((prevElements) =>
// //           prevElements.map((element) => {
// //             const elementBounds = {
// //               left: element.left,
// //               right: element.left + 50, // Assuming element width is 50
// //               top: element.top,
// //               bottom: element.top + 50, // Assuming element height is 50
// //             };
    
// //             const isCollision =
// //               element.falling &&
// //               panelBounds.left < elementBounds.right &&
// //               panelBounds.right > elementBounds.left &&
// //               elementBounds.bottom > 550; // Adjust this value based on your panel position
    
// //             if (isCollision) {
// //               // Handle the collision (e.g., increment score)
// //               handleElementCatch(element.type);
// //             }
    
// //             return isCollision ? { ...element, falling: false } : element;
// //           })
// //         );
// //       }
// //     },
// //   });

// //   const handleElementCatch = (elementType) => {
// //     if (elementType === 'bomb') {
// //       setLives((prevLives) => prevLives - 1);
// //     } else {
// //       setScore((prevScore) => prevScore + 1); 
// //     }
// //   };


// //   // //////////////
// //   const [fallingElements, setFallingElements] = useState([
// //     { type: 'bomb', top: 0, left: 100, falling: true }, 
// //     { type: 'shoot', top: 30, left: 200, falling: true },
// //     { type: 'boost', top: 50, left: 300, falling: true },
// //     { type: 'fire', top: 70, left: 400, falling: true },
// //   ]);


// //   const getImageByType = (type) => {
// //     switch (type) {
// //       case 'bomb':
// //         return bombImage;
// //       case 'shoot':
// //         return shootImage;
// //       case 'boost':
// //         return boostImage;
// //       case 'fire':
// //         return fireImage;
// //       default:
// //         return null;
// //     }
// //   };
  

// //   useEffect(() => {
// //     const updateFallingElements = () => {
// //       setFallingElements((prevElements) =>
// //         prevElements.map((element) => ({
// //           ...element,
// //           top: element.falling ? element.top + 5 : element.top,
// //         }))
// //       );
// //     };
  
// //     const fallingInterval = setInterval(() => {
// //       updateFallingElements();
// //     }, 50); // Adjust the interval based on your preference
  
// //     return () => {
// //       clearInterval(fallingInterval);
// //     };
// //   }, [fallingElements]);
// // /////

// // // const onPanResponderMove: (event, gestureState) => {
 
// // // },


// //   return (
// //     <ImageBackground source={backgroundImage} style={styles.container}>
// //       {/* Score and Lives */}
// //       <View style={styles.scoreContainer}>
// //         <Text style={styles.livesText}>Lives: {lives}</Text>
// //         <Text style={styles.scoreText}>Score: {score}</Text>
// //       </View>

// //       {/* Panel for catching elements */}
// //       <View
// //         ref={panelRef}
// //         style={styles.panel}
// //         {...panResponder.panHandlers}
// //       >
// //         <Image source={element1Image} style={styles.elementImage} />
// //         <Image source={element2Image} style={styles.elementImage} />
// //         <Image source={element3Image} style={styles.elementImage} />
// //       </View>

// //       {/* Falling Elements */}
// //       <Image source={bombImage} style={styles.fallingElement} />
// //       <Image source={shootImage} style={styles.fallingElement} />
// //       <Image source={boostImage} style={styles.fallingElement} />
// //       <Image source={fireImage} style={styles.fallingElement} />

// //         {/* Falling Elements */}
// //     {fallingElements.map((element, index) => (
// //       <Image
// //         key={index}
// //         source={getImageByType(element.type)}
// //         style={{
// //           ...styles.fallingElement,
// //           top: element.top,
// //           left: element.left,
// //         }}
// //       />
// //     ))}
// //     </ImageBackground>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     resizeMode: 'cover',
// //     justifyContent: 'center',
// //   },
// //   scoreContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 16,
// //     paddingTop: 16,
// //   },
// //   scoreText: {
// //     color: '#fff',
// //     fontSize: 20,
// //   },
// //   livesText: {
// //     color: '#fff',
// //     fontSize: 20,
// //   },
// //   panel: {
// //     position: 'absolute',
// //     bottom: 0,
// //     left: 0,
// //     flexDirection: 'row',
// //   },
// //   elementImage: {
// //     width: 50,
// //     height: 50,
// //     marginHorizontal: 10,
// //   },
// //   fallingElement: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 100, // Adjust the initial position based on your design
// //     width: 50,
// //     height: 50,
// //   },
// // });

// // export default StartScreen;



// // /////////////////////////////////////////////// Top three score code
//      {/* ////////////////////////////// */}

//         {/* First Result */}
//         {topScores.length > 0 && (
//             <View style={styles.resultContainer}>
//               <Image source={backArrow} style={styles.arrowImage} />
//               <View style={styles.resultContainer_border}>
//                 <View style={styles.backgroundContainer}>
//                   <ImageBackground
//                     source={backgroundImage1}
//                     style={styles.backgroundImage}>
//                     <Text style={styles.scoreText}>{topScores[0]}</Text>
//                   </ImageBackground>
//                 </View>
//               </View>
//               <Image source={forwardArrow} style={styles.arrowImage} />
//             </View>
//           )}
  
//           {/* Second Result */}
//           {topScores.length > 1 && (
//             <View style={styles.resultContainer}>
//               <Image source={backArrow} style={styles.arrowImage} />
//               <View
//                style={styles.resultContainer_border}>
//                 <View style={styles.backgroundContainer}>
//                   <ImageBackground
//                     source={backgroundImage1}
//                     style={styles.backgroundImage}>
//                     <Text style={styles.scoreText}>{topScores[1]}</Text>
//                   </ImageBackground>
//                 </View>
//               </View>
//               <Image source={forwardArrow} style={styles.arrowImage} />
//             </View>
//           )}
  
//           {/* Third Result */}
//           {topScores.length > 2 && (
//             <View style={styles.resultContainer}>
//               <Image source={backArrow} style={styles.arrowImage} />
//               <View
//                 style={styles.resultContainer_border}>
//                 <View style={styles.backgroundContainer}>
//                   <ImageBackground
//                     source={backgroundImage1}
//                     style={styles.backgroundImage}>
//                     <Text style={styles.scoreText}>{topScores[2]}</Text>
//                   </ImageBackground>
//                 </View>
//               </View>
//               <Image source={forwardArrow} style={styles.arrowImage} />
//             </View>
//           )}
  
//           {/* ////////////////// /////////////////////////////*/}