import { Box, Typography, Button, TextField, Divider } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ItemNuevoRestaurante({ onActualizarLista }) {
  const [nuevoRestaurante, setNuevoRestaurante] = useState({
    nombre: "",
    tipo: "",
    horario: "",
    imagen: "",
  });
  const navigate = useNavigate();

  const handleChangeRestaurante = (e) => {
    const { name, value } = e.target;
    setNuevoRestaurante({
      ...nuevoRestaurante,
      [name]: value,
    });
  };

  const handleAgregarRestaurante = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:3000/restaurantes")
      .then((response) => {
        const restaurantes = response.data;
        const antId =
          restaurantes.length > 0
            ? restaurantes[restaurantes.length - 1].id
            : 0;
        const nuevoId = (parseInt(antId) + 1).toString();
        const nuevo = { id: nuevoId, ...nuevoRestaurante };

        axios
          .post("http://localhost:3000/restaurantes", nuevo)
          .then(() => {
            alert("Restaurante agregado exitosamente");
            setNuevoRestaurante({
              nombre: "",
              tipo: "",
              horario: "",
              imagen: "",
            });
            onActualizarLista();
            navigate("/home");
          })
          .catch((err) => {
            alert("No se pudo agregar el restaurante");
          });
      })
      .catch((err) => {
        alert("No se pudo agregar el restaurante!!");
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        marginTop: "30px",
        p: 4,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Agregar Restaurante
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <form onSubmit={handleAgregarRestaurante}>
        <TextField
          label="Nombre del Restaurante"
          fullWidth
          margin="normal"
          name="nombre"
          value={nuevoRestaurante.nombre}
          onChange={handleChangeRestaurante}
          required
        />
        <TextField
          label="Tipo"
          fullWidth
          margin="normal"
          name="tipo"
          value={nuevoRestaurante.tipo}
          onChange={handleChangeRestaurante}
          required
        />
        <TextField
          label="Horario"
          fullWidth
          margin="normal"
          name="horario"
          value={nuevoRestaurante.horario}
          onChange={handleChangeRestaurante}
          required
        />
        <TextField
          label="Imagen"
          fullWidth
          margin="normal"
          name="imagen"
          value={nuevoRestaurante.imagen}
          onChange={handleChangeRestaurante}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Agregar Restaurante
        </Button>
      </form>
    </Box>
  );
}
