import React from "react";
import ItemRestaurante from "./ItemRestaurante";

export function ListaRestaurantes({restaurantes}) {
  return (
    <>
      
      <div className="restaurantes-container">
        {restaurantes.map((restaurante, index) => (
          <ItemRestaurante
            key={restaurante.id}
            restaurante = {restaurante}            
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


