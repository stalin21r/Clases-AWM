import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const DetalleRestaurante = ({ route, navigation, onActualizarLista }) => {
  const { id } = route.params;
  const [restaurante, setRestaurante] = useState(null);

  const obtenerRestaurante = () => {
    axios
      .get(`http://172.29.21.122:3000/restaurantes/${id}`)
      .then((response) => setRestaurante(response.data.restaurante))
      .catch(() => alert('Error al cargar los datos del restaurante.'));
  }

  useEffect(() => {
    obtenerRestaurante();
  }, [id]);

  const handleEliminar = () => {
    axios
      .delete(`http://172.29.21.122:3000/restaurantes/${id}`)
      .then(() => {
        alert('Restaurante eliminado.');
        onActualizarLista();
        navigation.goBack();
      })
      .catch(() => alert('No se pudo eliminar el restaurante.'));
  };

  if (!restaurante) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: restaurante.imagen }} style={styles.image} />
      <Text style={styles.name}>{restaurante.nombre}</Text>
      <Text style={styles.type}>Tipo: {restaurante.tipo}</Text>
      <Text style={styles.schedule}>Horario: {restaurante.horario}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() =>
            navigation.navigate('EditarRestaurante', { id: restaurante._id, onActualizarRestaurante: obtenerRestaurante})
          }
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleEliminar}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 16,
  },
  schedule: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'blue',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DetalleRestaurante;
