import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ListaRestaurantes = ({ restaurantes, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {restaurantes.map((restaurante) => (
        <TouchableOpacity
          key={restaurante._id}
          style={styles.item}
          onPress={() =>
            navigation.navigate('DetalleRestaurante', { id: restaurante._id })
          }
        >
          <Image source={{ uri: restaurante.imagen }} style={styles.image} />
          <Text style={styles.name}>{restaurante.nombre}</Text>
          <Text style={styles.type}>Tipo de comida: {restaurante.tipo}</Text>
          <Text style={styles.schedule}>Horario: {restaurante.horario}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  type: {
    fontSize: 14,
    color: '#666',
  },
  schedule: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
});

export default ListaRestaurantes;
