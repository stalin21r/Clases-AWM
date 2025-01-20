import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Registrar } from "./components/Registrar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar si el usuario está logueado

  const handleLogin = () => {
    setIsLoggedIn(true); // Cambia el estado cuando se inicie sesión
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de inicio de sesión */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* Ruta de registro */}
        <Route path="/registrar" element={<Registrar onLogin={handleLogin}/>} />

        {/* Ruta protegida que solo muestra si la sesión está iniciada */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <h1>Sesión Iniciada</h1>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Ruta por defecto: redirige al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
