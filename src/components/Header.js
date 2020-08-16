import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = () => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri:
            "https://i.kym-cdn.com/entries/icons/mobile/000/000/091/TrollFace.jpg",
        }}
      />
    </View>
  );
};

export default Header;

// https://i.kym-cdn.com/entries/icons/mobile/000/000/091/TrollFace.jpg
