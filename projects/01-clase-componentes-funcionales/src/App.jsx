//import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ItemNuevoRestaurante } from "./components/ItemNuevoRestaurante";
import { ListaRestaurantes } from "./components/ListaRestaurantes";
import { EditarRestaurante } from "./components/EditarRestaurante";
import { NavBar } from "./components/NavBar";
import { DetalleRestaurante } from "./components/DetalleRestaurante";

function App() {
  //const [restaurantes, setRestaurantes] = useState(listaRestaurantes);
  const [restaurantes, setRestaurantes] = useState([]);

  const agregarRestaurante = (nuevoRestaurante) => {
    setRestaurantes((prevRestaurantes) => [
      ...prevRestaurantes,
      nuevoRestaurante,
    ]);
  };

  const editarRestaurante = (id, restauranteEditado) => {
    setRestaurantes((prevRestaurantes) =>
      prevRestaurantes.map((restaurante) =>
        restaurante.id === id ? { ...restaurante, ...restauranteEditado } : restaurante
      )
    );
  };

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
      <BrowserRouter>
        <NavBar />
        <h1>Bienvenidos a ÑamEC</h1>

        <Routes>
          <Route
            path={"/"}
            element={<Navigate to="/home" replace />}
          />
          <Route
            path={"/home"}
            element={<ListaRestaurantes restaurantes={restaurantes} />}
          />
          <Route
            path={"/agregar"}
            element={
              <ItemNuevoRestaurante onAgregarRestaurante={agregarRestaurante} />
            }
          />
          <Route path={"/restaurante/:id"} element={<DetalleRestaurante />} />

          <Route
            path={"/editar/:id"}
            element={
              <EditarRestaurante onEditarRestaurante={editarRestaurante} />
            }
          />
        </Routes>

        {/*}
      <div>
        <button onClick={cargarRestaurantes}>cargar</button>
      </div>
{*/}

        {/*} 
      <div>
        <button onClick={insertarNuevo}>Insertar Nuevo</button>
      </div>
{*/}
      </BrowserRouter>
    </div>
  );
}

export default App;
