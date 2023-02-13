import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { BACKEND_URL, requestApi, setError, setLoading, setMessage } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const VerifyScreen = () => {
    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {user} = useSelector(state => state.auth)

    const verifyAccount = async(otp) => {
     try {
      const response = await fetch(`${BACKEND_URL}/verify`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({otp}) 
      });
      const data = await response.json();
      console.log(data)
     if(!data.success){
      dispatch(setError({message: data.message}))
      return;
     }
     setOtp("")
     dispatch(setMessage({message: data.message}))
     navigation.navigate("Login")
     } catch (error) {
     dispatch(setLoading(false))
      alert(error)
     }
    }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, margin: 20, fontWeight: "bold"}}>Verify Account</Text>
     
     <View style={{width: "70%"}}>
     <TextInput 
        style={styles.input}
        placeholder="OTP"
        value={otp}
        onChangeText={value => setOtp(value)}
        />
        {!user?.verified && <TouchableOpacity style={{marginVertical: 10, width: "100%"}}>
        <Button disabled={!otp} title='Verify' color={"#8b1ed1"} onPress={() => verifyAccount(otp)} />
        </TouchableOpacity>}
        </View>

    </View>
  )
}

export default VerifyScreen

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