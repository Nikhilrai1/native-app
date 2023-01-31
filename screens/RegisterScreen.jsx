import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = ({route}) => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [avatar,setAvatar] = useState("");
  const navigation = useNavigation();

    const handleImage = () => {
        navigation.navigate("Camera");
    }

  const handleRegister = () => {
    console.log(name,email,password)
    console.log(route.params.image)
  }

useEffect(() => {
  if(route.params && route.params.image){
    setAvatar(route.params.image)
  }
},[route])

  return (
    <View style={styles.container}>
        <Avatar.Image 
        size={100} 
        source={{uri: avatar ? avatar : null}} 
        style={{backgroundColor: "#900"}}
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
        <Button disabled={!name || !email || !password} title='Login' color={"#900"} onPress={handleRegister} />
        </TouchableOpacity>
        </View>

        <View style={{marginVertical: 10, alignItems: "center", justifyContent: "center"}}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{fontSize: 15, color: "#900"}}>Login</Text>
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