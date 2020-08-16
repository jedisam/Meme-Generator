import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ViewShot from "react-native-view-shot";
import * as Permissions from "expo-permissions";

const changeImg = async (setImg) => {
  const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (granted) {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });
    if (!data.cancelled){
      setImg(data.uri)
      console.log(data);
    }
  } else {
    Alert.alert("Permission is required to access Gallery");
  }
};

const saveImg = async (uri, setUri, viewShotRef, navigation) => {
  const img = await viewShotRef.current.capture();

            await setUri(img);      
            const granted = await MediaLibrary.getPermissionsAsync()
            if (granted) {
                  await MediaLibrary.saveToLibraryAsync(img);
                  console.log('Saved!')
                  alert('saved to Gallery!')
                  navigation.navigate('Home')

            } else {
              Alert.alert("Permission is required");
            }
}

const Edit = ({navigation, route}) => {
  // setImg(route.params.data.uri)
  const imgRoute = route.params.data.uri
  console.log(route.params.data.uri)
  const viewShotRef = useRef(null);
  const [uri, setUri] = useState("");
  const [img, setImg] = useState(imgRoute)
  // setImg(imgRoute)
  return (
    <View style={{ flex: 1 }}>
        <ViewShot ref={viewShotRef}  options={{ format: "jpg", quality: 0.9 }} style={{ flex: 7 }} >
            <ImageBackground
              source={{
                uri:
                  img,
              }}
              style={{
                flex: 1,
                  resizeMode: "cover",
                justifyContent: "center",
                width: null,
                height: null,
                resizeMode: "contain",
              }}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <TextInput
                  placeholder='Enter Top Text'
                  placeholderTextColor='#000'
                  textAlign='center'
                  multiline={true}
                  maxLength={27}
                  autoCapitalize = 'characters'
                  onKeyPress = {() => {}}
                  returnKeyType = 'done'
                  style={{
                    //   borderWidth: 10,
                    padding: 18,
                    position: "absolute",
                    top: 14,
                    width: Dimensions.get("screen").width - 30,
                    alignItems: "center",
                    fontSize: 40,
                    color: '#fff'
                  }}
                />
                <TextInput
                  placeholder='Enter Bottom Text'
                  placeholderTextColor='#000'
                  // color="#fff"
                  textAlign='center'
                  multiline={true}
                  maxLength={27}
                  autoCaptialize = 'characters'
                  style={{
                    //   borderWidth: 10,
                    padding: 18,
                    position: "absolute",
                    bottom: 14,
                    width: Dimensions.get("screen").width - 30,
                    alignItems: "center",
                    fontSize: 40,
                    color: '#fff'

                  }}
                />
              </View>
            </ImageBackground>
            
        </ViewShot>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity style={styles.btn} onPress={ () => changeImg(setImg)} >
          <Text>Change Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { flex: 1, flexDirection: "row" }]}
          onPress={() => saveImg(uri, setUri, viewShotRef, navigation)}
        >
          <Entypo name='save' size={22} style={{ marginRight: 5 }} />
          <Text>Save Image</Text>
        </TouchableOpacity>
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
    marginTop: 13,
    margin: 12,
    padding: 10,
  },
});

export default Edit;

// https://i.kym-cdn.com/entries/icons/mobile/000/000/091/TrollFace.jpg
