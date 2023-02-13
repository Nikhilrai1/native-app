import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Button, TouchableOpacity, Text, Alert } from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import MapViewDirections from 'react-native-maps-directions';

 function MapScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mapRegion,setMapRegion] = useState({
        latitude: 27.7142863,
        longitude: 85.3512216,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })


    const destination = {latitude: 27.7142863, longitude: 85.351216};

    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        console.log(currentLocation)
        setMapRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
    }
  useLayoutEffect(() => {
    getUserLocation();
  },[])
    
      if (errorMsg) {
       Alert.alert(errorMsg)
      } 
  return (
    <View style={styles.container}>
      <MapView 
        region={mapRegion}
        style={styles.map} 
        zoomEnabled={true}
        followUserLocation={true}
        showsUserLocation={true}
        initialRegion={mapRegion}
        zoomTapEnabled={true}
      >
        {/* <Marker coordinate={mapRegion} title="Current Location" description='Your location'/> */}
        <MapViewDirections
        origin={{latitude: 27.7606599,longitude:85.3316974}}
        destination={destination}
  />
      </MapView>
        <TouchableOpacity  onPress={() => getUserLocation()}>
          <Text style={{fontSize: 15, color: "#8b1ed1"}}>location</Text>
          </TouchableOpacity>
          {location && 
            <Text>latitude is {location.latitude} && longitude is {location.longitude}</Text>
          }
    </View>
  );
}


export default MapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '50%',
  },
});
