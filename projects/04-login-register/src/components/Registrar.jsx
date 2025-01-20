import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export function Registrar({ onLogin }) {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3000/register", formData);
      const { message, token, Email } = response.data;

      console.log("Registro exitoso:", message);
      console.log("Token recibido:", token);
      console.log("Usuario:", Email);

      setSuccess("Usuario registrado con éxito. Ahora será redirigido.");

      localStorage.setItem("authToken", token);

      onLogin();

      // Redirigir al usuario después de un breve retraso
      setTimeout(() => {
        navigate("/dashboard"); // Redirigir a /dashboard
      }, 2000);
    } catch (err) {
      console.error("Error al registrar usuario:", err.response?.data || err);
      setError("Hubo un problema al registrar el usuario. Intente de nuevo.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Registrar Usuario
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Email"
            label="Correo Electrónico"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Contraseña"
            type="password"
            id="Password"
            autoComplete="new-password"
            value={formData.Password}
            onChange={handleChange}
          />
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
