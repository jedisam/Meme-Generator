import React from "react";
import { StyleSheet, Text, View } from "react-native";
import constants from "expo-constants";

import Home from "./src/screens/Home";
import Edit from "./src/screens/Edit";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar} />
      {/* <Edit /> */}
      <Home />
    </View>
  );
}

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
