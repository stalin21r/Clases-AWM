import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  const handleAgregar = () => {
    navigate("/agregar");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Icono de Menú */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* Título del Navbar */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ÑamEC
        </Typography>

        {/* Botón con acción de navegar */}
        <Button onClick={handleAgregar} color="inherit">
          Nuevo
        </Button>

        {/* Botón que usa Link para navegación */}
        <Button component={Link} to="/agregar" color="inherit">
          Nuevo (Link)
        </Button>
      </Toolbar>
    </AppBar>
  );
};


