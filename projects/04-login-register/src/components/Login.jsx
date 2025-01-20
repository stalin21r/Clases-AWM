import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function Login({ onLogin }) {
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/login", formData);
      const { message, token, Email } = response.data;

      console.log("Inicio de sesión exitoso:", message);
      console.log("Token recibido:", token);
      console.log("Usuario:", Email);

      // Guarda el token en localStorage (o donde prefieras)
      localStorage.setItem("authToken", token);

      // Actualiza el estado de la app al iniciar sesión
      onLogin();

      // Redirige al dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Error al iniciar sesión:", err.response?.data || err);
      setError("Credenciales incorrectas o error del servidor.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Email"
            label="Correo Electrónico"
            name="Email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            value={formData.Password}
            onChange={handleChange}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>

          <Button component={Link} to="/registrar" color="inherit" sx={{mt: 3, mb: 2}} fullWidth>
            registrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
