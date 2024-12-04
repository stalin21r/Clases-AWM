import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Margin } from "@mui/icons-material";

/*
Forma de desestructuracion 1
function ItemRestaurante(props) {

  const {name, type, hour, img} = props;
*/

/*Forma de desestructuracion 2*/
function ItemRestaurante({ restaurante }) {
  return (
    <div className="restaurant-item">
      <img src={restaurante.imagen} alt="plato" />
      <h4>{restaurante.nombre}</h4>
      <p>Tipo de comida: {restaurante.tipo}</p>
      <p>Horario: {restaurante.horario}</p>
      <div className="btn-rest-container">
      <Button
        component={Link}
        to={"/restaurante/" + restaurante.id}
        variant="contained"
        sx={{mb:2}}
      >
        Detalle
      </Button>
      <Button
        component={Link}
        to={"/editar/" + restaurante.id}
        variant="contained"
        color="success"
        sx={{mb:2}}
      >
        Editar
      </Button>  
      </div>
      
    </div>
  );
}

export default ItemRestaurante;
