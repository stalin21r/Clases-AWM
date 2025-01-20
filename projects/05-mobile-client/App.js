import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { ListaRestaurantes } from './components/ListaRestaurantes';

const App = () => {
  const [restaurantes, setRestaurantes] = useState([]);

  const cargarRestaurantes = () => {
    axios
      .get("http://172.29.46.141:3000/restaurantes")
      .then((response) => {
        setRestaurantes(response.data.restaurantes);
      })
      .catch((err) => {
        console.error("Error al conectar con la base de datos:", err);
        alert("Error al conectar con la base de datos");
      });
  };

  useEffect(() => {
    cargarRestaurantes();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ñam EC</Text>
        
        <ListaRestaurantes restaurantes={restaurantes} />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
