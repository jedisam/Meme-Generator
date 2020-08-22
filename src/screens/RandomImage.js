import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ViewShot from "react-native-view-shot";
import * as ImageManipulator from "expo-image-manipulator";
import * as Permissions from "expo-permissions";
import * as Sharing from 'expo-sharing'

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

useEffect(() => {
    const imgs = 'https://i.imgflip.com/345v97.jpg'
    Image.getSize( imgs, ( Width, Height ) =>
        {
            console.log(Width, Height)
            // this.setState({ ImageWidth: Width, ImageHeight: Height });
        },(errorMsg) =>
        {
            console.log( errorMsg );
        });
  }, []);


const RandomImage = ({navigation}) => {


    // componentWillMount(){
    //     const img = 'https://i.imgflip.com/345v97.jpg'
    //     Image.getSize( img, ( Width, Height ) =>
    //         {
    //             console.log(Width, Height)
    //             // this.setState({ ImageWidth: Width, ImageHeight: Height });
    //         },(errorMsg) =>
    //         {
    //             console.log( errorMsg );
    //         });
    
      }

    


//   const imgRoute = route.params.data.uri
  const viewShotRef = useRef(null);
  const [uri, setUri] = useState("https://i.imgflip.com/345v97.jpg");
  const [img, setImg] = useState('https://i.imgflip.com/345v97.jpg')
  return (
    <View style={{ flex: 1 }}>
        <ViewShot ref={viewShotRef}  options={{ format: "jpg", quality: 0.9 }} style={{ flex: 7}} >
        {/* Image.getSize( img, ( Width, Height ) =>
        {
            this.setState({ ImageWidth: Width, ImageHeight: Height });
        },(errorMsg) =>
        {
            console.log( errorMsg );
        }); */}
            <ImageBackground
              source={{
                uri:
                  img,
              }}
              style={{
                flex: 1,
                width: null,
                height: 400,
                aspectRatio: 0.9, 
                resizeMode: 'contain',
                // aspectRatio: 1.1
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
                    bottom: 7,
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
        <TouchableOpacity style={styles.btn} onPress={ () => changeImg(setImg)} >
          <Text>Change Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => saveImg(uri, setUri, viewShotRef, navigation)}
        >
          <Entypo name='save' size={22} style={{ marginRight: 5 }} />
          <Text>Save Image</Text>
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
              openShareDialogAsync(viewShotRef)} }
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
