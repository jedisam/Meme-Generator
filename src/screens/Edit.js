import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Entypo, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ViewShot from 'react-native-view-shot';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import * as Sharing from 'expo-sharing';

const changeImg = async setImg => {
  try {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 3],
        quality: 1,
      });
      if (!data.cancelled) {
        setImg(data.uri);
      }
    } else {
      Alert.alert('Permission is required to access Gallery');
    }
  } catch (err) {
    console.log(err);
  }
};

const saveImg = async (setTopText, setBottomText, viewShotRef, navigation) => {
  try {
    const img = await viewShotRef.current.capture();
    const granted = await MediaLibrary.getPermissionsAsync();
    if (granted) {
      await MediaLibrary.saveToLibraryAsync(img);
      setTopText('');
      setBottomText('');
      alert('saved to Gallery!');
      navigation.navigate('Home');
    } else {
      Alert.alert('Permission is required');
    }
  } catch (err) {
    console.log(err);
  }
};
const openShareDialogAsync = async viewShotRef => {
  const img = await viewShotRef.current.capture();
  if (!(await Sharing.isAvailableAsync())) {
    alert(`Uh oh, sharing isn't available on your platform`);
    return;
  }
  try {
    const manipResult = await ImageManipulator.manipulateAsync(img);
    await Sharing.shareAsync(manipResult.uri);
  } catch (err) {
    alert(err);
    console.log('ERROR: ', err);
  }
};

const Edit = ({ navigation, route }) => {
  const imgRoute = route.params.data.uri;
  const viewShotRef = useRef(null);
  const [img, setImg] = useState(imgRoute);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const { width, height } = Dimensions.get('window');

  return (
    <View style={{ flex: 1 }}>
      <ViewShot
        ref={viewShotRef}
        options={{ format: 'jpg', quality: 0.9 }}
        style={{ flex: 7 }}
      >
        <ImageBackground
          source={{
            uri: img,
          }}
          resizeMode="contain"
          style={{
            flex: 1,
            justifyContent: 'center',
            width,
            height: null,
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TextInput
              placeholder="Enter Top Text"
              placeholderTextColor="#000"
              textAlign="center"
              multiline={true}
              maxLength={27}
              onChangeText={text => setTopText(text)}
              autoCapitalize="characters"
              onKeyPress={() => {}}
              returnKeyType="done"
              style={styles.upper}
            />
            <TextInput
              placeholder="Enter Bottom Text"
              placeholderTextColor="#000"
              textAlign="center"
              multiline={true}
              onChangeText={text => setBottomText(text)}
              maxLength={27}
              autoCaptialize="characters"
              style={styles.bottom}
            />
          </View>
        </ImageBackground>
      </ViewShot>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <TouchableOpacity style={styles.btn} onPress={() => changeImg(setImg)}>
          <Text style={{ color: '#fff' }}>Change Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 130,
            height: 50,
            backgroundColor: topText && bottomText ? '#39f70a' : '#b6f285',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 13,
            margin: 4,
            flexDirection: 'row',
          }}
          onPress={() =>
            topText && bottomText
              ? saveImg(setTopText, setBottomText, viewShotRef, navigation)
              : null
          }
        >
          <Entypo
            name="save"
            size={22}
            style={{ marginRight: 5 }}
            color="#fff"
          />
          <Text style={{ color: '#fff' }}>Save Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: topText && bottomText ? '#39f70a' : '#b6f285',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 13,
            margin: 4,
            width: 8,
            height: 50,
            padding: 0,
          }}
          onPress={() => {
            topText && bottomText ? openShareDialogAsync(viewShotRef) : null;
          }}
        >
          <Ionicons name="md-share-alt" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  upper: {
    padding: 6,
    position: 'absolute',
    top: 10,
    width: Dimensions.get('screen').width - 30,
    alignItems: 'center',
    fontSize: 40,
    color: '#fff',
  },
  bottom: {
    padding: 6,
    position: 'absolute',
    bottom: 7,
    width: Dimensions.get('screen').width - 30,
    alignItems: 'center',
    fontSize: 40,
    color: '#fff',
  },
  btn: {
    width: 130,
    height: 50,
    backgroundColor: '#39f70a',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,
    margin: 4,
    flexDirection: 'row',
  },
});

export default Edit;
