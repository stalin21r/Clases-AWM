const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: [true, "Debe ingresar un correo"],
    },
    Password: {
      type: String,
      required: [true, "Debe ingresar una contraseña"],
    },
    Rol: {
      type: Boolean,
      required: [true, "Debe ingresar un rol"],
    }
  },
  {
    timestamps: true,
  }
);
const Usuario = mongoose.model("Usuario", UserSchema);
module.exports = Usuario;
