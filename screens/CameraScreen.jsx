import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraType } from 'expo-camera'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";

const CameraScreen = () => {
    const [type, setType] = useState(CameraType.back);
  const [haspermission, setHasPermission] = useState(null)
  const camera = useRef()
  const navigation = useNavigation()
  const route = useRoute();

useEffect(() => {
    (async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted")
    })();
},[])

const openImagePickerAsync = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if(permissionResult.granted === false){
    alert("Permission to access camera roll is required...")
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true, // cropping
    aspect: [1,1], // in 1:1 ratio
    quality: 1, // maximum quality
  })
  console.log("result",result)
  if (!result.canceled) {
    console.log(result);
    console.log("result",result.assets[0].uri)
    if(route.params?.profileScreen) return  navigation.navigate("Profile",{image: result.assets[0].uri})
    return navigation.navigate("Register",{image: result.assets[0].uri})
  } else {
    alert('You did not select any image.');
  }
}

const clickPicture = async () => {
  const data = await camera.current.takePictureAsync();
  console.log(data)
  if(route.params?.profileScreen) return  navigation.navigate("Profile",{image: data.uri})
  navigation.navigate("Register",{image: data.uri})
}
if(haspermission === null){
    return <View />
}

if(haspermission === false){
    return <Text>No access to camera</Text>
}



  return (
    <View style={{flex: 1}}>
       <Camera style={styles.camera} type={type} ratio="1:1" ref={camera}>
        <View
        style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 10,
            justifyContent: "space-evenly",
            width: "100%"
        }}
        >
          <Icon name='image' size={40} color="#fff" onPress={openImagePickerAsync} />
          <Icon name='camera' size={40} color="#fff" onPress={clickPicture} />
          <Icon 
            name='flip-camera-android'
            size={40}
            color="#fff"
            onPress={() => setType(current => current === CameraType.back ? CameraType.front : CameraType.back)}
          />
        </View>
      </Camera>
    </View>
  )
}

export default CameraScreen

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    text: {

    },
    button: {
        
    }
})