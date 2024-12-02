import React from "react";
import ItemRestaurante from "./ItemRestaurante";

function ListaRestaurantes({restaurantes}) {
  return (
    <>
      
      <div className="restaurantes-container">
        {restaurantes.map((restaurante, index) => (
          <ItemRestaurante
            key={index}
            name={restaurante.nombre}
            type={restaurante.tipo}
            hour={restaurante.horario}
            img={restaurante.imagen}
          ></ItemRestaurante>
        ))}
      </div>

      {/*} 
      <div>
        <button onClick={insertarNuevo}>Insertar Nuevo</button>
      </div>
{*/}
      
    </>
  );
}


export default ListaRestaurantes;