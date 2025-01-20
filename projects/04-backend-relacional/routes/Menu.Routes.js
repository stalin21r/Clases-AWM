const MenuController = require('../controllers/Menu.Controller'); // Asegúrate de que el path sea correcto

module.exports = function(app) {
  app.post('/menus', MenuController.createMenu); // Crear menú
  app.get('/menus', MenuController.obtainMenus); // Obtener todos los menús
  app.get('/menus/:id', MenuController.obtainMenuById); // Obtener menú por ID
  app.get('/menus/restaurante/:id', MenuController.obtainMenusByRestauranteId); // Obtener menús por ID de restaurante
  app.put('/menus/:id', MenuController.updateMenuById); // Actualizar menú por ID
  app.delete('/menus/:id', MenuController.deleteMenuById); // Eliminar menú por ID
};
