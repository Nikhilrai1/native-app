import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { BACKEND_URL, getProfie, setError, setMessage } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

const Task = ({title,description,status, taskId}) => {
  const [completed,setCompleted] = useState(status);

    const dispatch = useDispatch()

    const updateTask = async(taskId) => {
      setCompleted(prev => !prev)
      const response = await fetch(`${BACKEND_URL}/task/${taskId}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
     if(!data.success){
      dispatch(setError({message: data.message}))
     }

    }
    
    const deleteTask = async(taskId) => {
      const response = await fetch(`${BACKEND_URL}/task/${taskId}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
     if(!data.success){
      dispatch(setError({message: data.message}))
     }
     dispatch(getProfie());
     dispatch(setMessage({message: data.message}))
    }

  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
      }}
    >
     <View style={{width: "70%"}}>
      <Text style={{fontSize: 20, marginVertical: 7, color: "#8b1ed1"}}>{title}</Text>
      <Text style={{color: "#4a4a4a"}}>{description}</Text>
     </View>
     <Checkbox 
     status={completed ? "checked": "unchecked"} 
     color={"#000"} 
     onPress={() => updateTask(taskId)}
     />
     <Icon 
     name='delete'
     color={"#fff"}
     size={20}
     style={{
      backgroundColor: "#8b1ed1",
      padding: 10,
      borderRadius: 100
     }}
     onPress={() => deleteTask(taskId)}
     />
    </View>
  )
}

export default Task

const styles = StyleSheet.create({})