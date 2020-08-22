import React from "react";
import { StyleSheet, Text, View } from "react-native";
import constants from "expo-constants";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./src/screens/Home";
import Edit from "./src/screens/Edit";
import RandomImage from "./src/screens/RandomImage";

const Stack = createStackNavigator();

const App = () => {
  return (
  <NavigationContainer style={{ flex: 1 }}>
      <View style={styles.topBar} />
      <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="Random" component={RandomImage} />
    </Stack.Navigator>
  </NavigationContainer>

  )
}
export default App

// export default function App() {
//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.topBar} />
//       {/* <Edit /> */}
//       <Home />
      
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
    height: constants.statusBarHeight,
    backgroundColor: "#39f70a",
  },
});
