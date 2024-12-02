import { Box, Typography, Button, TextField, Divider } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";


export function ItemNuevoRestaurante({ onAgregarRestaurante }) {
  const [nuevoRestaurante, setNuevoRestaurante] = useState({nombre:"", tipo:"", horario:"", imagen:""});

  const handleChangeRestaurante = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value } = e.target;
    setNuevoRestaurante({
      ...nuevoRestaurante,
      [name]: value,
    })
  }

  const handleAgregarRestaurante = async (e) => {
    e.preventDefault();
  
    try {
      // Obtener el último ID del servidor
      const response = await axios.get("http://localhost:3000/restaurantes");
      const restaurantes = response.data;
  
      // Asegúrate de que haya al menos un restaurante antes de intentar acceder al último ID
      const antId = restaurantes.length > 0 ? restaurantes[restaurantes.length - 1].id : 0;
      console.log("Último ID:", antId);
  
      // Realizar el POST solo si se obtuvo un ID válido
      const nuevoId = parseInt(antId) + 1; // Si necesitas incrementar manualmente el ID
      const nuevoRestauranteConId = { id: nuevoId, ...nuevoRestaurante };
  
      const postResponse = await axios.post("http://localhost:3000/restaurantes", nuevoRestauranteConId);
       
      await onAgregarRestaurante(nuevoRestaurante);

      alert("Restaurante agregado exitosamente");

      // Resetear el formulario
      setNuevoRestaurante({ nombre: "", tipo: "", horario: "", imagen: "" });
    } catch (err) {
      console.error("Error al agregar restaurante:", err);
      alert("Ocurrió un error. Intenta nuevamente.");
    }
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
          id="nombre"
          value={nuevoRestaurante.nombre}
          onChange={handleChangeRestaurante}
          required
        />
        <TextField
          label="tipo"
          fullWidth
          margin="normal"
          name="tipo"
          id="tipo"
          value={nuevoRestaurante.tipo}
          onChange={handleChangeRestaurante}
          required
        />
        <TextField
          label="horario"
          fullWidth
          margin="normal"
          name="horario"
          id="horario"
          value={nuevoRestaurante.horario}
          onChange={handleChangeRestaurante}
          required
        />
        <TextField
          label="imagen"
          fullWidth
          margin="normal"
          name="imagen"
          id="imagen"
          value={nuevoRestaurante.imagen}
          onChange={handleChangeRestaurante}
          required
        />

        <section style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="submit" variant="contained" color="primary">
            Agregar Restaurante
          </Button>
        </section>
      </form>
    </Box>
  );
}
