import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_URL, clearError, clearMessage, setError, setMessage } from '../redux/authSlice';

const ForgotPassword = () => {
  const [email,setEmail] = useState("");
  const navigation = useNavigation();

  const {message,error,loading} = useSelector(state => state.auth);
  const dispatch = useDispatch()


const forgetPassword = async({email}) => {
   try {
    const response = await fetch(`${BACKEND_URL}/forgetpassword`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email}) 
      });
     
      const data = await response.json();
      if(!data.success){
        dispatch(setError({message: data.message}))
        return;
       }
       dispatch(setMessage({message: data.message}))
       navigation.navigate("ResetPassword")
      
      } catch (error) {
        console.log(error)
        alert(error)
        dispatch(setError(error))
        dispatch(clearError())
      }
     
    }

     useEffect(() => {
    if(error){
      alert(error)
      dispatch(clearError())
    }
    if(message){
      alert(message)
      dispatch(clearMessage())
    }
  },[loading,message,error,dispatch])


  return (
    <View style={styles.container}>
      <Text  style={{fontSize: 20, margin: 20, fontWeight: "bold"}}>Forget Password</Text>
     <View style={{width: "70%"}}>
      <TextInput 
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={value => setEmail(value)}
        />
         <TouchableOpacity style={{marginVertical: 10, width: "100%"}}>
        <Button disabled={!email}  title='Forget Password' color={"#8b1ed1"} onPress={() => forgetPassword({email})} />
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

export default ForgotPassword

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