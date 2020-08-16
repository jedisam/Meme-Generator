import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const Home = () => {
  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [2, 1],
        quality: 0.7,
      });
      console.log(data);
      //   if (!data.cancelled) {
      //     let newFile = {
      //       uri: data.uri,
      //       type: `test/${data.uri.split(".")[1]}`,
      //       name: `test/${data.uri.split(".")[1]}`,
      //     };
      //   }
      // console.log(data);
    } else {
      Alert.alert("Permission is required to access Gallery");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View style={{ marginBottom: 35 }}>
          <Text style={{ fontSize: 60, color: "#39f70a" }}>MEME</Text>
          <Text style={{ fontSize: 50, color: "#39f70a" }}>GENERATOR</Text>
        </View>
        <Image
          source={{
            uri:
              "https://i.kym-cdn.com/entries/icons/mobile/000/000/091/TrollFace.jpg",
          }}
          style={{ height: 200, width: 250, marginBottom: 40 }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => pickFromGallery()}
          >
            <Text style={{ color: "#fff" }}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={{ color: "#fff" }}>Use Random Image</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 150,
    height: 50,
    backgroundColor: "#39f70a",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 23,
    margin: 14,
    padding: 10,
  },
});

export default Home;
