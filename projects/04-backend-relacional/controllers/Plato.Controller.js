const { response } = require('express');
const Plato = require('../models/Plato.Model'); // Ajusta el path según tu estructura

// Crear un plato
module.exports.createPlato = async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;

    // Validaciones adicionales para el precio
    if (precio <= 0) {
      return res.status(400).json({
        message: "El precio debe ser mayor a cero",
      });
    }

    const plato = await Plato.create({ nombre, descripcion, precio });
    res.status(201).json({
      plato: plato,
      message: "Plato creado exitosamente",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el plato",
      error: error.message,
    });
  }
};

// Obtener todos los platos
module.exports.obtainPlatos = async (req, res) => {
  try {
    const platos = await Plato.findAll(); // Obtiene todos los registros
    res.status(200).json({
      platos: platos,
      message: "Lista de platos obtenida exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los platos",
      error: error.message,
    });
  }
};

// Obtener un plato por ID
module.exports.obtainPlatoById = async (req, res) => {
  const { id } = req.params;
  try {
    const plato = await Plato.findByPk(id); // Busca por clave primaria
    if (!plato) {
      return res.status(404).json({
        message: "Plato no encontrado",
      });
    }
    res.status(200).json({
      plato: plato,
      message: "Plato encontrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el plato",
      error: error.message,
    });
  }
};

// Actualizar un plato por ID
module.exports.updatePlatoById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Validaciones adicionales para el precio
    if (updatedData.precio !== undefined && updatedData.precio <= 0) {
      return res.status(400).json({
        message: "El precio debe ser mayor a cero",
      });
    }

    const [updatedRows, [updatedPlato]] = await Plato.update(updatedData, {
      where: { id: id },
      returning: true, // Devuelve el registro actualizado
    });

    if (updatedRows === 0) {
      return res.status(404).json({
        message: "Plato no encontrado",
      });
    }
    res.status(200).json({
      plato: updatedPlato,
      message: "Plato actualizado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el plato",
      error: error.message,
    });
  }
};

// Eliminar un plato por ID
module.exports.deletePlatoById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Plato.destroy({
      where: { id: id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({
        message: "Plato no encontrado",
      });
    }
    res.status(200).json({
      message: "Plato eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el plato",
      error: error.message,
    });
  }
};
