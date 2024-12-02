import React, { Component } from "react";

/*
Forma de desestructuracion 1
function ItemRestaurante(props) {

  const {name, type, hour, img} = props;
*/

/*Forma de desestructuracion 2*/
function ItemRestaurante({name, type, hour, img}) {

  return (
    <div className="restaurant-item">
      <img src={img} alt="plato" />
      <h4>{name}</h4>
      <p>Tipo de comida: {type}</p>
      <p>Horario: {hour}</p>
    </div>
  );
}

export default ItemRestaurante;
