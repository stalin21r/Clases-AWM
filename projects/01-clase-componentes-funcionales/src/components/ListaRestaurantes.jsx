import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export function ListaRestaurantes({ restaurantes }) {
  return (
    <div className="restaurantes-container">
      {restaurantes.map((restaurante) => (
        <div className="restaurant-item" key={restaurante._id}>
          <img src={restaurante.imagen} alt="plato" />
          <h4>{restaurante.nombre}</h4>
          <p>Tipo de comida: {restaurante.tipo}</p>
          <p>Horario: {restaurante.horario}</p>
          <Button
            component={Link}
            to={"/restaurante/" + restaurante.id}
            variant="contained"
            sx={{mb: 2}}
          >
            Detalle
          </Button>
        </div>
      ))}
    </div>
  );
}
