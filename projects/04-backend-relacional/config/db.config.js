const { Sequelize } = require('sequelize');
require('dotenv').config();
const fs = require('fs');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión con postgresql db establecida!!');
  })
  .catch((err) => {
    console.error('Error al conectar con la db:', err);
  });

// Sincronización de los modelos (crear las tablas automáticamente)
sequelize
  .sync({ force: false })  // Usa 'false' para evitar eliminar tablas existentes
  .then(() => {
    console.log('Tablas sincronizadas correctamente');
  })
  .catch((err) => {
    console.error('Error al sincronizar las tablas:', err);
  });

module.exports = sequelize;
