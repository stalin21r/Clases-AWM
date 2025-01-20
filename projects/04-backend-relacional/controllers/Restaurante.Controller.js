const { response } = require('express');
const Restaurante = require('../models/Restaurante.Model'); // Ajusta el path según tu estructura

// Crear un restaurante
module.exports.createRestaurante = async (req, res) => {
  try {
    const { nombre, tipo, horario, imagen } = req.body;
    const restaurante = await Restaurante.create({ nombre, tipo, horario, imagen });
    res.status(201).json({
      restaurante: restaurante,
      message: "Restaurante creado exitosamente"
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el restaurante",
      error: error.message
    });
  }
};

// Obtener todos los restaurantes
module.exports.obtainRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurante.findAll(); // Obtiene todos los registros
    res.status(200).json({
      restaurantes: restaurantes,
      message: "Lista de restaurantes obtenida exitosamente"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los restaurantes",
      error: error.message
    });
  }
};

// Obtener un restaurante por ID
module.exports.obtainRestauranteById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurante = await Restaurante.findByPk(id); // Busca por clave primaria
    if (!restaurante) {
      return res.status(404).json({
        message: "Restaurante no encontrado"
      });
    }
    res.status(200).json({
      restaurante: restaurante,
      message: "Restaurante encontrado exitosamente"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el restaurante",
      error: error.message
    });
  }
};

// Actualizar un restaurante por ID
module.exports.updateRestauranteById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const [updatedRows, [updatedRestaurante]] = await Restaurante.update(updatedData, {
      where: { id: id },
      returning: true, // Devuelve el registro actualizado
    });

    if (updatedRows === 0) {
      return res.status(404).json({
        message: "Restaurante no encontrado"
      });
    }
    res.status(200).json({
      restaurante: updatedRestaurante,
      message: "Restaurante actualizado exitosamente"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el restaurante",
      error: error.message
    });
  }
};

// Eliminar un restaurante por ID
module.exports.deleteRestauranteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Restaurante.destroy({
      where: { id: id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({
        message: "Restaurante no encontrado"
      });
    }
    res.status(200).json({
      message: "Restaurante eliminado exitosamente"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el restaurante",
      error: error.message
    });
  }
};
