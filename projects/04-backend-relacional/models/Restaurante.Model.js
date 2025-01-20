const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Ajusta el path según tu configuración de sequelize

const Restaurante = sequelize.define('Restaurante', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'El restaurante debe tener un nombre' },
      notEmpty: { msg: 'El restaurante debe tener un nombre' },
    },
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'El restaurante debe tener un tipo' },
      notEmpty: { msg: 'El restaurante debe tener un tipo' },
    },
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'El restaurante debe tener un horario' },
      notEmpty: { msg: 'El restaurante debe tener un horario' },
    },
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'El restaurante debe tener una imagen' },
      notEmpty: { msg: 'El restaurante debe tener una imagen' },
    },
  },
}, {
  timestamps: true, // Agrega columnas createdAt y updatedAt
  tableName: 'restaurantes', // Nombre de la tabla en la base de datos
});

module.exports = Restaurante;
