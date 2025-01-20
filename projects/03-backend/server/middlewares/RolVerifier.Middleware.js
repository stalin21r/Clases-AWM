module.exports.VerificarAdministrador = (req, res, next) => {
  if (req.Usuario && req.Usuario.Rol === true) {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado, se requiere rol de administrador' });
  }
};
