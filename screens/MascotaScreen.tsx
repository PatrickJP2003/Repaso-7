import { Button, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { ref, remove, set } from "firebase/database";
import { db } from '../config/Config';
import { onValue } from "firebase/database";

export default function MascotaScreen() {
  const [idGuardar, setIdGuardar] = useState("");
  const [nombreGuardar, setNombreGuardar] = useState("");
  const [especieGuardar, setEspecieGuardar] = useState("");
  const [edadGuardar, setEdadGuardar] = useState("");

  const [idEditar, setIdEditar] = useState("");
  const [nombreEditar, setNombreEditar] = useState("");
  const [especieEditar, setEspecieEditar] = useState("");
  const [edadEditar, setEdadEditar] = useState("");

  const [idEliminar, setIdEliminar] = useState("");

  function GuardarData() {
    set(ref(db, 'mascotas/' + idGuardar), {
      name: nombreGuardar,
      especie: especieGuardar,
      edad: edadGuardar
    }).then(() => {
      // Limpiar campos después de guardar
      setIdGuardar("");
      setNombreGuardar("");
      setEspecieGuardar("");
      setEdadGuardar("");
    }).catch((error) => {
      console.log("Error al guardar:", error);
    });
  }

  function leerMascota() {
    try {
      const starCountRef = ref(db, 'mascotas/' + idEditar);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setNombreEditar(data.name);
        setEspecieEditar(data.especie);
        setEdadEditar(data.edad);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function editar() {
    set(ref(db, 'mascotas/' + idEditar), {
      name: nombreEditar,
      especie: especieEditar,
      edad: edadEditar
    }).then(() => {
      // Limpiar campos después de editar
      setIdEditar("");
      setNombreEditar("");
      setEspecieEditar("");
      setEdadEditar("");
    }).catch((error) => {
      console.log("Error al editar:", error);
    });
  }

  function eliminar() {
    remove(ref(db, 'mascotas/' + idEliminar)).then(() => {
      // Limpiar campos después de eliminar
      setIdEliminar("");
    }).catch((error) => {
      console.log("Error al eliminar:", error);
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/*------------------ GUARDAR -------------------------- */}
      <View style={styles.section}>
        <Text style={styles.title}>GUARDAR</Text>
        <TextInput
          placeholder='Ingresar id'
          style={styles.input}
          onChangeText={(texto) => setIdGuardar(texto)}
          value={idGuardar}
        />
        <TextInput
          placeholder='Ingresar nombre'
          style={styles.input}
          onChangeText={(texto) => setNombreGuardar(texto)}
          value={nombreGuardar}
        />
        <TextInput
          placeholder='Ingresar especie'
          style={styles.input}
          onChangeText={(texto) => setEspecieGuardar(texto)}
          value={especieGuardar}
        />
        <TextInput
          placeholder='Ingresar edad'
          style={styles.input}
          onChangeText={(texto) => setEdadGuardar(texto)}
          value={edadGuardar}
        />
        <Button title='Guardar' onPress={GuardarData} />
      </View>

      <View style={styles.separator} />

      {/*------------------ EDITAR-------------------------- */}
      <View style={styles.section}>
        <Text style={styles.title}>EDITAR</Text>
        <View style={styles.row}>
          <TextInput
            placeholder='Ingresar id'
            style={styles.input}
            onChangeText={(texto) => setIdEditar(texto)}
            value={idEditar}
          />
          <Button title='Buscar' color={'#299979'} onPress={leerMascota} />
        </View>
        <TextInput
          placeholder='Ingresar nombre'
          style={styles.input}
          onChangeText={(texto) => setNombreEditar(texto)}
          value={nombreEditar}
        />
        <TextInput
          placeholder='Ingresar especie'
          style={styles.input}
          onChangeText={(texto) => setEspecieEditar(texto)}
          value={especieEditar}
        />
        <TextInput
          placeholder='Ingresar edad'
          style={styles.input}
          onChangeText={(texto) => setEdadEditar(texto)}
          value={edadEditar}
        />
        <Button title='Editar' color={'green'} onPress={editar} />
      </View>

      <View style={styles.separator} />

      {/*------------------ ELIMINAR------------------------- */}
      <View style={[styles.section, styles.eliminarSection]}>
        <Text style={styles.title}>ELIMINAR</Text>
        <TextInput
          placeholder='Ingresar id'
          style={styles.input}
          onChangeText={(texto) => setIdEliminar(texto)}
          value={idEliminar}
        />
        <Button title='ELIMINAR' color={'red'} onPress={eliminar} />
      </View>

      <View style={styles.separator} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  section: {
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  eliminarSection: {
    paddingBottom: 20, // Aumenta el espacio inferior para el botón de eliminar
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#666',
    borderRadius: 10,
    height: 40,
    marginBottom: 5,
    paddingHorizontal: 10,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#999',
    marginVertical: 10,
  },
});
