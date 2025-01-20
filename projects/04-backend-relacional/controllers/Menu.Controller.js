const { response } = require('express');
const Menu = require('../models/Menu.Model'); // Ajusta el path según tu estructura
const Restaurante = require('../models/Restaurante.Model'); // Ajusta el path según tu estructura
const Plato = require('../models/Plato.Model'); // Ajusta el path según tu estructura

// Crear un menú
module.exports.createMenu = async (req, res) => {
  try {
    const { descripcion, RestId, PlatoId } = req.body;
    const menu = await Menu.create({ descripcion, RestId, PlatoId });
    res.status(201).json({
      menu: menu,
      message: "Menú creado exitosamente",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el menú",
      error: error.message,
    });
  }
};

// Obtener todos los menús
module.exports.obtainMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: [
        { model: Restaurante, attributes: ['nombre'] },
        { model: Plato, attributes: ['nombre'] },
      ],
    });
    res.status(200).json({
      menus: menus,
      message: "Lista de menús obtenida exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los menús",
      error: error.message,
    });
  }
};

// Obtener un menú por ID
module.exports.obtainMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await Menu.findByPk(id, {
      include: [
        { model: Restaurante, attributes: ['nombre'] },
        { model: Plato, attributes: ['nombre'] },
      ],
    });

    if (!menu) {
      return res.status(404).json({
        message: "Menú no encontrado",
      });
    }
    res.status(200).json({
      menu: menu,
      message: "Menú encontrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el menú",
      error: error.message,
    });
  }
};

// Obtener menús por ID de restaurante
module.exports.obtainMenusByRestauranteId = async (req, res) => {
  const { restId } = req.params;
  try {
    const menus = await Menu.findAll({
      where: { RestId: restId },
      include: [
        { model: Restaurante, attributes: ['nombre'] },
        { model: Plato, attributes: ['nombre'] },
      ],
    });

    if (menus.length === 0) {
      return res.status(404).json({
        message: "No se encontraron menús para el restaurante especificado",
      });
    }

    res.status(200).json({
      menus: menus,
      message: "Menús encontrados exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los menús",
      error: error.message,
    });
  }
};

// Actualizar un menú por ID
module.exports.updateMenuById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const [updatedRows, [updatedMenu]] = await Menu.update(updatedData, {
      where: { id: id },
      returning: true, // Devuelve el registro actualizado
    });

    if (updatedRows === 0) {
      return res.status(404).json({
        message: "Menú no encontrado",
      });
    }
    res.status(200).json({
      menu: updatedMenu,
      message: "Menú actualizado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el menú",
      error: error.message,
    });
  }
};

// Eliminar un menú por ID
module.exports.deleteMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Menu.destroy({
      where: { id: id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({
        message: "Menú no encontrado",
      });
    }
    res.status(200).json({
      message: "Menú eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el menú",
      error: error.message,
    });
  }
};
