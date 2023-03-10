import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const Loader = () => {
  return (
    <View
        style={{
            backgroundColor: "#fff",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}
    >
      <ActivityIndicator animating={true} size={100} color="#75ff33" />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})