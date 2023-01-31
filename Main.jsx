import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Footer from './components/Footer';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import CameraScreen from './screens/CameraScreen';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/Loader';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();

const Main = () => {
  const [login,setLogin] = useState(false);
  const { isAuthenticated, loading } = useSelector(state => state.auth);
const dispatch = useDispatch()
  useEffect(() => {
    setLogin(isAuthenticated);
  },[dispatch,isAuthenticated])
  return (
    <>
   {loading ? <Loader /> :
    <NavigationContainer>
    <Stack.Navigator initialRouteName={login ? "Home" : "Login"}>
      <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
      <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      <Stack.Screen name="Profile" options={{headerShown: false}} component={ProfileScreen} />
      <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} />
      <Stack.Screen name="Camera" options={{headerShown: false}} component={CameraScreen} />
      <Stack.Screen name="ChangePassword" options={{headerShown: false}} component={ChangePasswordScreen} />
    </Stack.Navigator>
 <Footer />
  </NavigationContainer>
   }
    </>
  )
}

export default Main

const styles = StyleSheet.create({})