import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const initialRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

export default function MapaScreen() {
  const [region, setRegion] = useState(initialRegion);

  const obtenerUbicacion = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso para acceder a la ubicación denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

    } catch (error) {
      console.log('Error al obtener la ubicación:', error);
      alert('Error al obtener la ubicación');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {region.latitude !== 0 && region.longitude !== 0 && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Mi ubicación"
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={obtenerUbicacion}>
        <Text style={styles.buttonText}>Obtener Ubicación Actual</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    backgroundColor: '#005B41',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
