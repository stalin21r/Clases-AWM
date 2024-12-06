import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

export function DetalleRestaurante({ onActualizarLista }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/restaurantes/" + id)
      .then((response) => setRestaurante(response.data))
      .catch((err) => {
        console.error("Error al cargar los datos:", err);
        alert("No se pudo cargar el restaurante.");
      });
  }, [id]);

  const handleEliminarRestaurante = () => {
    axios
      .delete(`http://localhost:3000/restaurantes/${id}`)
      .then(() => {
        alert("Restaurante eliminado.");
        onActualizarLista();
        navigate("/home");
      })
      .catch(() => alert("No se pudo borrar el restaurante."));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <img src={restaurante.imagen} alt="plato" style={{height: "200px", width: "auto"}}/>
      <h2>{restaurante.nombre}</h2>
      <h3>Tipo de comida: {restaurante.tipo}</h3>
      <h4>Horario: {restaurante.horario}</h4>
      <Button
        variant="contained"
        color="error"
        onClick={handleEliminarRestaurante}
        style={{ marginRight: "10px" }}
      >
        Eliminar
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/editar/${id}`)}
      >
        Editar
      </Button>
    </div>
  );
}
