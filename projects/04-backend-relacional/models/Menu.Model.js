const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Ajusta el path según tu configuración de sequelize
const Restaurante = require('./Restaurante.Model'); // Ajusta el path según la ubicación de tu modelo Restaurante
const Plato = require('./Plato.Model'); // Ajusta el path según la ubicación de tu modelo Plato

const Menu = sequelize.define('Menu', {
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true, // Campo opcional
  },
}, {
  timestamps: true, // Agrega columnas createdAt y updatedAt
  tableName: 'menus', // Nombre de la tabla intermedia en la base de datos
});

Restaurante.belongsToMany(Plato, { through: Menu });
Plato.belongsToMany(Restaurante, { through: Menu });

Menu.belongsTo(Restaurante, { foreignKey: 'RestId' });
Menu.belongsTo(Plato, { foreignKey: 'PlatoId' });

module.exports = Menu;


