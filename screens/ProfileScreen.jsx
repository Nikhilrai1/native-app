import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, TextInput } from 'react-native-paper'
import { TabRouter, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_URL, clearError, clearMessage, getProfie, logoutSuccess, requestApi, setError, setMessage } from '../redux/authSlice';
import mime from 'mime';

const ProfileScreen = () => {
  const route = useRoute();
  const {user,message,error,loading} = useSelector(state => state.auth)
  const [avatar,setAvatar] = useState(user?.avatar.url);
  const [name,setName] = useState(user ? user?.name : "");
  const navigation = useNavigation();

    const dispatch = useDispatch();
  const handleChangePhoto = () => {
    navigation.navigate("Camera",{profileScreen: true})
  }

  const handleUpdate = async({}) => {
    dispatch(requestApi())
    const myForm = new FormData();
    const newAvatar = route.params?.image ? route.params?.image : avatar
    console.log(newAvatar)
    myForm.append("name",name);
    myForm.append("avatar",{
      uri: newAvatar,
      type: mime.getType(newAvatar),
      name: newAvatar.split("/").pop()
    })
  
    const response = await fetch(`${BACKEND_URL}/updateprofile`, {
      method: 'PUT', 
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: myForm
    });
    const data = await response.json();
   if(!data.success){
    dispatch(setError({message: data.message}))
   }
   dispatch(getProfie());
   dispatch(setMessage({message: data.message}))
   navigation.navigate("Profile")
  }

  const logoutUser = async() => {
    const response = await fetch(`${BACKEND_URL}/logout`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    console.log(data)
   if(!data.success){
    dispatch(setError({message: data.message}))
   }
   dispatch(logoutSuccess());
   dispatch(setMessage({message: data.message}))
   navigation.navigate("Login")
  }
  useEffect(() => {
    setAvatar(user?.avatar.url)
  },[user])



  // useEffect(() => {
  //   if(error){
  //     alert(error)
  //     dispatch(clearError())
  //   }
  //   if(message){
  //     alert(message)
  //     dispatch(clearMessage())
  //   }
  // },[loading,message,error,dispatch])

  return (
    <View  style={styles.container}>
     <Avatar.Image
     size={100}
      source={{uri: route.params?.image ? route.params?.image : avatar ? avatar : null}}
      style={{backgroundColor: "#8b1ed1", borderRadius: 100}}
     />
     <TouchableOpacity onPress={handleChangePhoto}>
  <Text style={{color: "#8b1ed1", margin: 20}} >Change Photo</Text>
     </TouchableOpacity>

     <View style={{width: "70%", display: "flex", justifyContent: "center", alignItems: "center"}}>
     <TextInput 
        style={styles.input}
        placeholder="Fullname"
        value={name}
        onChangeText={value => setName(value)}
        />
      <TouchableOpacity style={{marginVertical: 10, width: "100%",}}>
        <Button disabled={!name} title='Update' color={"#8b1ed1"} onPress={handleUpdate} />
        </TouchableOpacity>
        </View>

        <View style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
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