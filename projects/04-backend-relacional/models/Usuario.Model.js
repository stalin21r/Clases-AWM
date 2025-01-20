const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Ajusta el path según tu configuración de sequelize

const Usuario = sequelize.define('Usuario', {
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Debe ingresar un correo' },
      notEmpty: { msg: 'Debe ingresar un correo' },
    },
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Debe ingresar una contraseña' },
      notEmpty: { msg: 'Debe ingresar una contraseña' },
    },
  },
  Rol: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      notNull: { msg: 'Debe ingresar un rol' },
      notEmpty: { msg: 'Debe ingresar un rol' },
    },
  },
}, {
  timestamps: true,
  tableName: 'usuarios', // Nombre de la tabla en la base de datos
});

module.exports = Usuario;
