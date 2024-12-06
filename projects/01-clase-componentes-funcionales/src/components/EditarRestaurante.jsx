import { Box, Typography, Button, TextField, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export function EditarRestaurante({ onEditarRestaurante }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nuevoRestaurante, setNuevoRestaurante] = useState({
    nombre: "",
    tipo: "",
    horario: "",
    imagen: "",
  });

  useEffect(() => {
    const fetchRestaurante = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurantes/${id}`
        );
        setNuevoRestaurante(response.data);
      } catch (err) {
        alert("Error al cargar los datos del restaurante.");
      }
    };
    fetchRestaurante();
  }, [id]);

  const handleChangeRestaurante = (e) => {
    const { name, value } = e.target;
    setNuevoRestaurante({
      ...nuevoRestaurante,
      [name]: value,
    });
  };

  const handleEditarRestaurante = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3000/restaurantes/${id}`,
        nuevoRestaurante
      );
      alert("Restaurante editado exitosamente");

      if (onEditarRestaurante) {
        onEditarRestaurante(id, nuevoRestaurante);
      }

      navigate("/restaurante/"+id); 
    } catch (err) {
      console.error("Error al editar restaurante:", err);
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
        Editar Restaurante
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <form onSubmit={handleEditarRestaurante}>
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

        <section style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="submit" variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </section>
      </form>
    </Box>
  );
}
