import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser } from '../redux/authSlice';

const LoginScreen = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading,message,user,error,isAuthenticated} = useSelector(state => state.auth);


  const handleLogin = async(loginData) => {
    dispatch(loginUser({email:loginData.email,password:loginData.password}))
  }

  useEffect(() => {
    if(!loading && isAuthenticated && user){
     return navigation.navigate("Home");
    }
    if(error){
      alert(error)
      dispatch(clearError());
    }
  },[loading,isAuthenticated])


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, margin: 20, fontWeight: "bold"}}>Welcome</Text>
     
     <View style={{width: "70%"}}>
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
        <Button disabled={!email || !password} title='Login' color={"#8b1ed1"} onPress={() => handleLogin({email,password})} />
        </TouchableOpacity>
        </View>

        <View style={{marginVertical: 10, display: "flex",  alignItems: "center", justifyContent: "center"}}>
          <Text>or</Text>
          <TouchableOpacity style={{marginVertical: 10}} onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={{fontSize: 15, color: "gray"}}>forget password</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Register")}>
          <Text style={{fontSize: 15, color: "#8b1ed1"}}>Register</Text>
          </TouchableOpacity>
        </View>

    </View>
  )
}

export default LoginScreen

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