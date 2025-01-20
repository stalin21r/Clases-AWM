const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/Usuario.Model')
const JWT_SECRET = process.env.SECRET_KEY;

module.exports.VerificarToken = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const usuario = await User.findOne({ _id: decoded.id }).select('-Password');
      
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      req.Usuario = usuario;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'No autorizado, token inválido' });
    }
  } else {
    res.status(401).json({ message: 'No autorizado, token no enviado' });
  }
}
