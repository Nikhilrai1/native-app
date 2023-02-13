import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, TextInput } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_URL, clearError, clearMessage, requestApi, setError, setMessage } from '../redux/authSlice';
import mime from 'mime';

const RegisterScreen = () => {
  const route = useRoute();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [avatar,setAvatar] = useState("");
  const navigation = useNavigation();

  const {user,message,error,loading} = useSelector(state => state.auth);
  const dispatch = useDispatch()

    const handleImage = () => {
        navigation.navigate("Camera");
    }

    const handleRegister = async({name,email,password,avatar}) => {
      const myForm = new FormData();
      const newAvatar = route.params?.image ? route.params?.image : avatar
      myForm.append("name",name);
      myForm.append("email",email)
      myForm.append("password",password);
     if(avatar){
      console.log(avatar)
      myForm.append("avatar",{
        uri: newAvatar,
        type: mime.getType(newAvatar),
        name: newAvatar.split("/").pop()
      })
     }

      console.log(myForm)

      try {
        const response = await fetch(`${BACKEND_URL}/register`, {
          method: 'POST', 
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: myForm
        });
        const data = await response.json();
  
        console.log(data)
       if(data.success){
        dispatch(setMessage({message: data.message}))
        navigation.navigate("Verify")
        return;
       }
        dispatch(setError({message: data.message.message ? data.message.message : data.message}))
      
      } catch (error) {
        console.log(error)
        alert(error)
        dispatch(setError(error))
        dispatch(clearError())
      }
     
    }

useEffect(() => {
  if(route.params && route.params.image){
    setAvatar(route.params.image)
  }
},[route])

useEffect(() => {
  if(error){
    alert(error)
    dispatch(clearError())
  }
  if(message){
    alert(message)
    dispatch(clearMessage())
  }
},[error,message])



  return (
    <View style={styles.container}>
        <Avatar.Image 
        size={100} 
        source={{uri: avatar ? avatar : null}} 
        style={{backgroundColor: "#8b1ed1"}}
        />
      <Text onPress={handleImage} style={{fontSize: 20, margin: 20, fontWeight: "bold"}}>Change Photo</Text>
     
     <View style={{width: "70%"}}>
     <TextInput 
        style={styles.input}
        placeholder="Fullname"
        value={name}
        onChangeText={value => setName(value)}
        />
      <TextInput 
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={value => setEmail(value)}
        />
       <TextInput 
        secureTextEntry
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={value => setPassword(value)}
        />
         <TouchableOpacity style={{marginVertical: 10, width: "100%"}}>
        <Button disabled={!name || !email || !password} title='Register' color={"#8b1ed1"} onPress={() => handleRegister({name,email,password,avatar})} />
        </TouchableOpacity>
        </View>

        <View style={{marginVertical: 10, alignItems: "center", justifyContent: "center"}}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{fontSize: 15, color: "#8b1ed1"}}>Login</Text>
          </TouchableOpacity>
        </View>

    </View>
  )
}

export default RegisterScreen

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