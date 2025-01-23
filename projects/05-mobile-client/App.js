import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ListaRestaurantes from './components/ListaRestaurantes';
import DetalleRestaurante from './components/DetalleRestaurante';
import EditarRestaurante from './components/EditarRestaurante';
import axios from 'axios';

const Stack = createStackNavigator();

const App = () => {
  const [restaurantes, setRestaurantes] = useState([]);

  const cargarRestaurantes = () => {
    axios
      .get('http://172.29.21.122:3000/restaurantes')
      .then((response) => setRestaurantes(response.data.restaurantes))
      .catch((err) => {
        console.error('Error al conectar con la base de datos:', err);
        alert('Error al conectar con la base de datos');
      });
  };

  useEffect(() => {
    cargarRestaurantes();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ListaRestaurantes">
            {(props) => (
              <ListaRestaurantes
                {...props}
                restaurantes={restaurantes}
                onActualizarLista={cargarRestaurantes}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="DetalleRestaurante">
            {(props) => (
              <DetalleRestaurante
                {...props}
                onActualizarLista={cargarRestaurantes}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="EditarRestaurante">
            {(props) => (
              <EditarRestaurante
                {...props}
                onActualizarLista={cargarRestaurantes}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
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
});

export default App;
