import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import React, { useState } from 'react'
import { Avatar, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_URL, logoutSuccess } from '../redux/authSlice';

const ProfileScreen = () => {
  const {user} = useSelector(state => state.auth)
  const [avatar,setAvatar] = useState(user.avatar.url);
  const [name,setName] = useState(user.name);
  const navigation = useNavigation();

    const dispatch = useDispatch();
  const handleChangePhoto = () => {
    navigation.navigate("Camera")
  }

  const handleUpdate = async() => {
    const formData = {
      name,
      avatar
    };

    const response = await fetch(`${BACKEND_URL}/task/${taskId}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify(formData) 
    });
    const data = await response.json();
   if(!data.success){
    dispatch(setError({message: data.message}))
   }
   dispatch(getProfie());
   dispatch(setMessage({message: data.message}))
  }

  const logoutUser = async() => {
    const response = await fetch(`${BACKEND_URL}/logout`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
   if(!data.success){
    dispatch(setError({message: data.message}))
   }
   dispatch(logoutSuccess());
   dispatch(setMessage({message: data.message}))
  }

  return (
    <View  style={styles.container}>
     <Avatar.Image
     size={100}
      source={{uri: avatar ? avatar : null}}
      style={{backgroundColor: "#900"}}
     />
     <TouchableOpacity onPress={handleChangePhoto}>
  <Text style={{color: "#900", margin: 20}} >Change Photo</Text>
     </TouchableOpacity>

     <View style={{width: "70%", display: "flex", justifyContent: "center", alignItems: "center"}}>
     <TextInput 
        style={styles.input}
        placeholder="Fullname"
        value={name}
        onChangeText={value => setName(value)}
        />
      <TouchableOpacity style={{marginVertical: 10, width: "100%",}}>
        <Button disabled={!name} title='Update' color={"#900"} onPress={handleUpdate} />
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={{marginVertical: 10, width: "100%",}} onPress={() => navigation.navigate("ChangePassword")}>
          <Text>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginVertical: 10, width: "100%"}} onPress={() => logoutUser()}>
          <Text>Logout</Text>
        </TouchableOpacity>
        </View>
       
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: "100%",
  }
})