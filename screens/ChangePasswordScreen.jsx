import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { BACKEND_URL, requestApi, setError, setLoading, setMessage } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ChangePasswordScreen = () => {
    const [oldPassword,setOldpassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const changePassword = async(oldPassword,newPassword) => {
     try {
      const response = await fetch(`${BACKEND_URL}/updatepassword`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({oldpassword:oldPassword,newpassword:newPassword}) 
      });
      const data = await response.json();
      console.log(data)
     if(!data.success){
      dispatch(setError({message: data.message}))
      return;
     }
     dispatch(setMessage({message: data.message}))
     navigation.navigate("Login")
     dispatch(setLoading(false))
     } catch (error) {
     dispatch(setLoading(false))
      alert(error)
     }
    }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, margin: 20, fontWeight: "bold"}}>Change Password</Text>
     
     <View style={{width: "70%"}}>
     <TextInput 
        style={styles.input}
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={value => setOldpassword(value)}
        />
      <TextInput 
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={value => setNewPassword(value)}
        />
        <TouchableOpacity style={{marginVertical: 10, width: "100%"}}>
        <Button disabled={!oldPassword || !newPassword} title='Change' color={"#8b1ed1"} onPress={() => changePassword(oldPassword,newPassword)} />
        </TouchableOpacity>
        </View>

    </View>
  )
}

export default ChangePasswordScreen

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