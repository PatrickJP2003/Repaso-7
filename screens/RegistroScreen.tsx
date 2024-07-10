import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    function registro() {
        createUserWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigation.navigate("Login");
            Alert.alert(
                'Registro Exitoso',
                'Usuario registrado correctamente',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ]
            );
            setCorreo('');
            setContrasenia('');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(
                'Error en el Registro',
                errorMessage,
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ]
            );
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>REGISTRO</Text>

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

            <TouchableOpacity style={styles.button} onPress={registro}>
                <Text style={styles.buttonText}>Registrar</Text>
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
    title: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold',
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
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
