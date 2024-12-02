//import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

import axios from "axios";
import { ItemNuevoRestaurante } from "./components/ItemNuevoRestaurante";
import ListaRestaurantes from "./components/ListaRestaurantes";

function App() {
  //const [restaurantes, setRestaurantes] = useState(listaRestaurantes);
  const [restaurantes, setRestaurantes] = useState([]);

  const agregarRestaurante = (nuevoRestaurante) => {
    setRestaurantes( (prevRestaurantes) =>  
      [...prevRestaurantes, nuevoRestaurante]
    )
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/restaurantes")
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((err) => {
        console.error("Error al conectar con la base de datos:", err);
        alert("No se pudo conectar a la base de datos");
      });
  }, []);

/*
  const insertarNuevo = () => {
    setRestaurantes((prevRestaurantes) => [
      ...prevRestaurantes,
      {
        nombre: "Chao Pescao",
        tipo: "Mariscos",
        horario: "13:00 - 21:00",
        imagen:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpmy21qCggE-LqimRSfspw7MvR6Me5iA8YSw&s",
      },
    ]);
  };
*/
  /*
  const cargarRestaurantes = () => {
    axios
      .get("http://localhost:3000/restaurantes")
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((err) => {
        console.log("Error 404, no se encontro respuesta \n", err);
        alert("No se pudo conetar a la base de datos!!");
      });
  };
  */

  return (
    <div className="App">
      <h1>Bienvenidos a ÑamEC</h1>
{/*}
      <div>
        <button onClick={cargarRestaurantes}>cargar</button>
      </div>
{*/}
     <ListaRestaurantes restaurantes={restaurantes}/>

{/*} 
      <div>
        <button onClick={insertarNuevo}>Insertar Nuevo</button>
      </div>
{*/}
      <ItemNuevoRestaurante onAgregarRestaurante={agregarRestaurante}/>     

    </div>
  );
}

export default App;
