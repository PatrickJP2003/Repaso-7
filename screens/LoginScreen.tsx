import { TouchableOpacity, StyleSheet, Text, View, TextInput, Alert, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 2000, // Slower color change
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 2000, // Slower color change
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [colorAnim]);

  const colorInterpolation = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#005B41'],
  });

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Drawer');
        setCorreo(''); // Limpiar el campo de correo
        setContrasenia(''); // Limpiar el campo de contraseña
      })
      .catch((error) => {
        const errorCode = error.code;
        let titulo = '';
        let mensaje = '';
        if (errorCode === 'auth/wrong-password') {
          titulo = 'Error de Contraseña';
          mensaje = 'La contraseña es incorrecta';
        } else if (errorCode === 'auth/user-not-found') {
          titulo = 'Error de Usuario';
          mensaje = 'El usuario no existe';
        } else {
          titulo = 'Error de Acceso';
          mensaje = 'Revisar credenciales';
        }
        Alert.alert(titulo, mensaje);
      });
  }

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.welcome, { color: colorInterpolation }]}>
        Bienvenidos
      </Animated.Text>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder='Ingresa tu correo electrónico'
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType='email-address'
        style={styles.input}
        value={correo}
      />
      <TextInput
        placeholder='Ingresa contraseña'
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry={true}
        style={styles.input}
        value={contrasenia}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerContainer} onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.register}>👉 Regístrate aquí 👈</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDF5FD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#005B41',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  register: {
    fontSize: 16,
    color: '#fff',
  },
});
