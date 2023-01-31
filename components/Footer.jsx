import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Footer = () => {
    const navigation = useNavigation();
    const {user,isAuthenticated} = useSelector(state => state.auth);
  return (
    <View
    style={{
        padding: 30,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-around"
    }}
    >
     {isAuthenticated && <TouchableOpacity onPress={() => navigation.navigate("Home")}>
    <Icon name='home' size={30} color={"#900"} />
      </TouchableOpacity>}

    {isAuthenticated && <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
    <Icon name='user' size={30} color={"#900"} />
      </TouchableOpacity>}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
    <Icon name='login' size={30} color={"#900"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
    <Icon name='adduser' size={30} color={"#900"} />
      </TouchableOpacity>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({})