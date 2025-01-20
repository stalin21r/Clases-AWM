const Usuario = require('../models/Usuario.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();



const JWT_SECRET = process.env.SECRET_KEY; 

if (!JWT_SECRET) {
    throw new Error("SECRET_KEY no está definido en el archivo .env");
}
exports.register = async (req, res) => {
    try {
        const { Email, Password, Rol } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({ message: "Email y contraseña son obligatorios" });
        }
        const existingUser = await Usuario.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya está registrado" });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        //await new Usuario({Email, Password: hashedPassword}).save();
        const usuario = new Usuario({ Email, Password: hashedPassword, Rol});
        await usuario.save();
        const token = jwt.sign({ id: usuario._id, Email: usuario.Email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: "Usuario registrado con éxito",Email,token });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({ message: "Email y contraseña son obligatorios" });
        }
        const usuario = await Usuario.findOne({ Email });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const isPasswordValid = await bcrypt.compare(Password, usuario.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        const token = jwt.sign({ id: usuario._id, Email: usuario.Email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Inicio de sesión exitoso", token,Email: usuario.Email });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
};
