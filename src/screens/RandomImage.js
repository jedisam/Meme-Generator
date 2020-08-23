import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import ViewShot from "react-native-view-shot";
import * as Permissions from "expo-permissions";
import * as Sharing from 'expo-sharing'



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
const openShareDialogAsync = async (viewShotRef) => {
  const img = await viewShotRef.current.capture();
  if (!(await Sharing.isAvailableAsync())) {
    alert(`Uh oh, sharing isn't available on your platform`);
    return;
  }
  try {
    const manipResult = await ImageManipulator.manipulateAsync(img);
    await Sharing.shareAsync(manipResult.uri);
  } catch (err) {
    alert(err)
    console.log("ERROR: ", err)
  }
}; 



const RandomImage = ({navigation}) => {


   


//   const imgRoute = route.params.data.uri
  const viewShotRef = useRef(null); 
  // const [uri, setUri] = useState("https://i.imgflip.com/345v97.jpg");
  const [img, setImg] = useState('https://i.imgflip.com/345v97.jpg')
  const [allMemes, setAllMemes] = useState([])


  const changeImg = async (setImg) => {
    // const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (granted) {
    //   let data = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     allowsEditing: true,
    //     aspect: [2, 3],
    //     quality: 1,
    //   });
    //   if (!data.cancelled){
    //     setImg(data.uri)
    //     console.log(data);
    //   }
    // } else {
    //   Alert.alert("Permission is required to access Gallery");
    // }
  
      const randNum = Math.floor(Math.random() * allMemes.length)
      console.log(allMemes.length)
      setImg(allMemes[randNum].url)


  };




  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => {
        const { memes } = res.data 
        setAllMemes(memes)
      })
  });

  
  return (
    <View style={{ flex: 1 }}>
        <ViewShot ref={viewShotRef}  options={{ format: "jpg", quality: 0.9 }} style={{ flex: 7}} >
  
            <ImageBackground
              source={{
                uri:
                  img,
              }}
              resizeMode="contain"
              style={{
                flex: 1,
                width: width,
                height: null,
                justifyContent: 'center',
                alignItems: 'center'
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
                    top: 10,
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
                    bottom: -33,
                    width: Dimensions.get("screen").width - 30,
                    alignItems: "center",
                    fontSize: 40,
                    color: '#fff'

                  }}
                />
              </View>
            </ImageBackground>
            
        </ViewShot>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around' }}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: "#39f70a",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 13,
          margin: 4,
          width: 5,
          height: 50,
          padding: 0
            }}onPress={ () => changeImg(setImg)} >
        <FontAwesome name="rotate-right" size={24} color="#fff" />
          {/* <Text>Change Image</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => saveImg(uri, setUri, viewShotRef, navigation)}
        >
          <Entypo name='save' size={22} color="#fff" style={{ marginRight: 5 }} />
          <Text style={{color:"#fff"}}>Save Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "#39f70a",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 13,
          margin: 4,
          width: 8,
          height: 50,
          padding: 0
            }}
            onPress={() => { 
              console.log('Pressed')
              openShareDialogAsync()
              } }
        >
         <Ionicons name="md-share-alt" size={25} color="white" 
         />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: 130,
    height: 50,
    backgroundColor: "#39f70a",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 13,
    margin: 4,
    // padding: 8,
  },
});

export default RandomImage;
