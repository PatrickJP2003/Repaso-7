import { Alert, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { getAuth, signOut } from "firebase/auth";

export default function WelcomeScreen({ navigation }: any) {
  function cerrar() {
    const auth = getAuth();
    navigation.navigate("Login");
    Alert.alert("Hasta luego :) ");
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WelcomeScreen</Text>
      <TouchableOpacity style={styles.button} onPress={() => cerrar()}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E1D9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#005B41',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
