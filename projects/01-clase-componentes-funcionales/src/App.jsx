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
  const [restaurantes, setRestaurantes] = useState([]);

  const cargarRestaurantes = () => {
    axios
      .get("http://localhost:3000/restaurantes")
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((err) => {
        console.error("Error al conectar con la base de datos:", err);
        alert("No se pudo conectar a la base de datos");
      });
  };

  useEffect(() => {
    cargarRestaurantes();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <h1>Bienvenidos a ÑamEC</h1>
        <Routes>
          <Route path={"/"} element={<Navigate to="/home" replace />} />
          <Route
            path={"/home"}
            element={<ListaRestaurantes restaurantes={restaurantes} />}
          />
          <Route
            path={"/agregar"}
            element={
              <ItemNuevoRestaurante onActualizarLista={cargarRestaurantes} />
            }
          />
          <Route
            path={"/restaurante/:id"}
            element={
              <DetalleRestaurante onActualizarLista={cargarRestaurantes} />
            }
          />
          <Route
            path={"/editar/:id"}
            element={
              <EditarRestaurante onActualizarLista={cargarRestaurantes} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
