const { response } = require('express');
const Restaurante = require('../models/Restaurante.Model');

// Crear un restaurante
module.exports.createRestaurante = async (req, res) => {
  /*
  const {nombre, tipo, horario, imagen} = req.body;
  Restaurante.create({
    nombre, tipo, horario, imagen
  }).then(restaurante => res.json(restaurante)).catch(err => res.status(400).json(err));
  */
  const restaurante = new Restaurante(req.body);
  try {
    await restaurante.save();
    res.status(201).json({
      restaurante: restaurante,
      message: "Restaurante creado"
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
    const restaurantes = await Restaurante.find();
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
    const restaurante = await Restaurante.findOne({_id: id});
    if (!restaurante) {
      return res.status(404).json({
        message: "Restaurante no encontrado"
      });
    }
    res.status(200).json({
      restaurante: restaurante,
      message: "Restaurante encontrado"
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
    const restaurante = await Restaurante.findOneAndUpdate({_id: id}, updatedData, { new: true });
    if (!restaurante) {
      return res.status(404).json({
        message: "Restaurante no encontrado"
      });
    }
    res.status(200).json({
      restaurante: restaurante,
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
    const restaurante = await Restaurante.findByIdAndDelete(id);
    if (!restaurante) {
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
