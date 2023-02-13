import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/Entypo';
import { Dialog, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskFailure, addTaskSuccess, BACKEND_URL, clearError, clearMessage, getProfie, requestApi } from '../redux/authSlice';
import Loader from '../components/Loader';


const HomeScreen = () => {
  const [description,setDescription] = useState("");
  const [title,setTitle] = useState("");
  const [openDialogue,setOpenDialogue] = useState(false);
  const dispatch = useDispatch()
  const { user, error, message, loading } = useSelector(state => state.auth);

  const hideDialogue = () => setOpenDialogue(!openDialogue);
  
  const addTask = async ({title,description}) => {
    try {
      dispatch(requestApi());
      const response = await fetch(`${BACKEND_URL}/addtask`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title,description}) 
      });
      const data = await response.json();
     if(!data.success){
      dispatch(addTaskFailure({message: data.message}))
     }
     dispatch(getProfie());
     dispatch(addTaskSuccess({message: data.message}))
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    if(error){
       alert(error)
       dispatch(clearError())
       return;
    }

    if(loading){
      return <Loader />
    }
    if(message){
      alert(message)
      dispatch(clearMessage())
    }
  },[user,dispatch,message,error,loading])
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Text style={styles.heading}>My Tasks</Text>
      <ScrollView>
      {user?.tasks.map(task => (
        <Task key={task._id} taskId={task._id} title={task.title} description={task.description} status={task.completed} />
      ))}
      {(user?.tasks === [] || user?.tasks.length === 0 ) && 
      <View style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Text style={{color: "green"}}>No task to display...</Text>
        </View>
        }
      </ScrollView>

      <TouchableOpacity 
          style={styles.addBtn}
          onPress={hideDialogue}
      >
        <Icon 
          name='add-to-list'
          size={20}
          color={"green"}
        />
      </TouchableOpacity>
      <Dialog visible={openDialogue} onDismiss={hideDialogue}>
        <Dialog.Title>ADD A TASK</Dialog.Title>
        <Dialog.Content>
          <TextInput 
            style={styles.input}
            placeholder="Title"
            onChangeText={value => setTitle(value)}
          />
          <TextInput 
            style={styles.input}
            placeholder="Description"
            onChangeText={value => setDescription(value)}
          />

          <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
          <TouchableOpacity style={styles.button} onPress={hideDialogue}>
            <Text>Cancel</Text>
          </TouchableOpacity>

          <Button style={styles.button} title='ADD' color={"#8b1ed1"} onPress={() => addTask({title,description})}/>
          </View>

        </Dialog.Content>
      </Dialog>
    </SafeAreaView>
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  heading: {
    textAlign: "center", 
    fontSize: 28, 
    color: "white", 
    backgroundColor: "#8440af",
    marginBottom: 20, 
    marginTop: 20
  },
  addBtn: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "center",
    elevation: 5,
    marginBottom: 20
  },
  button: {
    marginHorizontal: 10
  }
});