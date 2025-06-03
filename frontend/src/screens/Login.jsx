import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleLogin =  async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Senha:", senha);

    const response = await axios.post("http://localhost:5002/api/Auth/Login", {
      usuario: email,
      password: senha
    });

    if(response && response.data) {
      if(response.data.authenticated) {
        localStorage.setItem("gendo@acessToken", response.data.acessToken)
        localStorage.setItem("gendo@doctorId", response.data.doctorId)
        navigate("/docArea"); 
      } else {
        alert("Email ou senha inseridos incorretamente")
      }
    } else {
      alert("Não foi possível completar o login")
    }
  };

  return (
    <>
      <div className="blue-line"></div>
      <div className="login-container">
        <div className="login-card">
          <p className="gendo-title">GENDO</p>
          <section className="login-section">
            <h2 className="login-subtitle">Login</h2>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <h2>Email</h2>
                <input
                  type="email"
                  className="text-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <h2>Senha</h2>
                <input
                  type="password"
                  className="text-input"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="blue-btn">Continuar</button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
