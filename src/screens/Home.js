import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const Home = ({ navigation }) => {
  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 3],
        quality: 1,
      });
      if (!data.cancelled) {
        navigation.navigate('Edit', { data });
      }
    } else {
      Alert.alert('Permission is required to access Gallery');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <View style={{ marginBottom: 35 }}>
          <Text style={{ fontSize: 60, color: '#39f70a' }}>MEME</Text>
          <Text style={{ fontSize: 50, color: '#ffbc03' }}>GENERATOR</Text>
        </View>
        <Image
          source={{
            uri: '../../assets/img.png',
          }}
          style={{
            height: 200,
            width: 250,
            marginBottom: 40,
            backgroundColor: '#fff',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => pickFromGallery()}
          >
            <Text style={{ color: '#fff' }}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Random')}
          >
            <Text style={{ color: '#fff' }}>Use Random Image</Text>
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
    backgroundColor: '#39f70a',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 23,
    margin: 14,
    padding: 10,
  },
});

export default Home;
