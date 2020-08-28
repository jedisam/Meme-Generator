import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import ViewShot from 'react-native-view-shot';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Sharing from 'expo-sharing';
import constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const RandomImage = ({ navigation }) => {
  const viewShotRef = useRef(null);
  const [img, setImg] = useState('https://i.imgflip.com/345v97.jpg');
  const [allMemes, setAllMemes] = useState([]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const changeImg = async setImg => {
    const randNum = Math.floor(Math.random() * allMemes.length);
    setImg(allMemes[randNum].url);
  };

  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => {
        const { memes } = res.data;
        setAllMemes(memes);
      });
  });

  const saveImg = async () => {
    try {
      const img = await viewShotRef.current.capture();
      const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (granted) {
        const granted = await MediaLibrary.getPermissionsAsync();
        await MediaLibrary.saveToLibraryAsync(img);
        alert('saved to Gallery!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Permission is required');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openShareDialogAsync = async () => {
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

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ViewShot
        ref={viewShotRef}
        options={{ format: 'jpg', quality: 0.9 }}
        style={{ flex: 7 }}
      >
        <TextInput
          placeholder="Enter Top Text"
          placeholderTextColor="#000"
          textAlign="center"
          multiline={true}
          maxLength={35}
          autoCapitalize="characters"
          onKeyPress={() => {}}
          returnKeyType="done"
          onChangeText={text => setTopText(text)}
          style={{
            flex: 2.5,
            // padding: 18,
            // marginTop: 2,
            width,
            textAlign: 'center',
            alignItems: 'center',
            fontSize: 36,
            color: '#000',
            backgroundColor: '#fff',
          }}
        />

        <Image
          style={{
            flex: 4,
            width: width,
            height: height - 60 - constants.statusBarHeight,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -25,
          }}
          source={{ uri: img }}
          resizeMode="contain"
          resizeMethod="resize"
        />

        <TextInput
          placeholder="Enter Bottom Text"
          placeholderTextColor="#000"
          textAlign="center"
          multiline={true}
          maxLength={33}
          autoCaptialize="characters"
          onChangeText={text => setBottomText(text)}
          style={{
            flex: 1.5,
            // padding: 18,
            width,
            textAlign: 'center',
            alignItems: 'center',
            fontSize: 36,
            color: '#000',
            backgroundColor: '#fff',
          }}
        />
      </ViewShot>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <TouchableOpacity
          style={styles.random}
          onPress={() => changeImg(setImg)}
        >
          <FontAwesome name="rotate-right" size={24} color="#fff" />
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
          onPress={() => (topText && bottomText ? saveImg() : null)}
        >
          <Entypo
            name="save"
            size={22}
            color="#fff"
            style={{ marginRight: 5 }}
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
            topText && bottomText ? openShareDialogAsync() : null;
          }}
        >
          <Ionicons name="md-share-alt" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  random: {
    flex: 1,
    backgroundColor: '#39f70a',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,
    margin: 4,
    width: 5,
    height: 50,
    padding: 0,
  },
});

export default RandomImage;
