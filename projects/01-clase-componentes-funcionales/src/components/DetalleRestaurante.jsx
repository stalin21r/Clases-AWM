import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function DetalleRestaurante() {
  const { id } = useParams();
  
  const [restaurante, setRestaurante] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/restaurantes/"+id)
      .then((response) => {
        setRestaurante(response.data);
      })
      .catch((err) => {
        console.error("Error al conectar con la base de datos:", err);
        alert("No se pudo conectar a la base de datos");
      });
  }, [id]);

  return (
    <>
      <h2>{restaurante.nombre}</h2>      
      <h4>{restaurante.tipo}</h4>
      <h4>{restaurante.horario}</h4>
      <img src={restaurante.imagen}/>
    </>
  );
}
