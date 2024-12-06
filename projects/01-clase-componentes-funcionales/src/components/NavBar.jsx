import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  const handleAgregar = () => {
    navigate("/agregar");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button component={Link} to="/home" color="inherit">
          <Typography variant="h6" component="div">
            ÑamEC
          </Typography>
        </Button>

        <div>
          <Button onClick={handleAgregar} color="inherit">
            Nuevo
          </Button>

          <Button component={Link} to="/agregar" color="inherit">
            Nuevo (Link)
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
