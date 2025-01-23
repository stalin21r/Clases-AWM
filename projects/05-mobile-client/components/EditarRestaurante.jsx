import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EditarRestaurante = ({ route, navigation, onActualizarLista }) => {
  const { id, onActualizarRestaurante} = route.params;
  const [restaurante, setRestaurante] = useState({
    nombre: '',
    tipo: '',
    horario: '',
    imagen: '',
  });

  useEffect(() => {
    axios
      .get(`http://172.29.21.122:3000/restaurantes/${id}`)
      .then((response) => setRestaurante(response.data.restaurante))
      .catch(() => alert('Error al cargar los datos del restaurante.'));
  }, [id]);

  const handleChange = (name, value) => {
    setRestaurante({ ...restaurante, [name]: value });
  };

  const handleGuardar = () => {
    axios
      .put(`http://172.29.21.122:3000/restaurantes/${id}`, restaurante)
      .then(() => {
        alert('Restaurante actualizado.');
        onActualizarLista();
        onActualizarRestaurante();
        navigation.goBack();
      })
      .catch(() => alert('Error al guardar los cambios.'));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={restaurante.nombre}
        onChangeText={(value) => handleChange('nombre', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={restaurante.tipo}
        onChangeText={(value) => handleChange('tipo', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Horario"
        value={restaurante.horario}
        onChangeText={(value) => handleChange('horario', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Imagen"
        value={restaurante.imagen}
        onChangeText={(value) => handleChange('imagen', value)}
      />
      <Button title="Guardar" onPress={handleGuardar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default EditarRestaurante;
