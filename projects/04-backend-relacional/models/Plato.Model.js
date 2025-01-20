const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Ajusta el path según tu configuración de sequelize

const Plato = sequelize.define('Plato', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'El plato debe tener un nombre' },
      notEmpty: { msg: 'El plato debe tener un nombre' },
    },
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true, // Este campo es opcional
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2), // Hasta 10 dígitos en total, 2 decimales
    allowNull: false,
    validate: {
      notNull: { msg: 'El plato debe tener un precio' },
      notEmpty: { msg: 'El plato debe tener un precio' },
      isDecimal: { msg: 'El precio debe ser un número válido' },
      min: {
        args: [0.01],
        msg: 'El precio debe ser mayor a cero',
      },
    },
  },
}, {
  timestamps: true, // Agrega columnas createdAt y updatedAt
  tableName: 'platos', // Nombre de la tabla en la base de datos
});

module.exports = Plato;
