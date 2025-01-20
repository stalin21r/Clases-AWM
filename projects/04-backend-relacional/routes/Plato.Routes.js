const PlatoController = require('../controllers/Plato.Controller');

module.exports = function(app) {
  app.post('/platos', PlatoController.createPlato); // Crear plato
  app.get('/platos', PlatoController.obtainPlatos); // Obtener todos los platos
  app.get('/platos/:id', PlatoController.obtainPlatoById); // Obtener plato por ID
  app.put('/platos/:id', PlatoController.updatePlatoById); // Actualizar plato por ID
  app.delete('/platos/:id', PlatoController.deletePlatoById); // Eliminar plato por ID
};
