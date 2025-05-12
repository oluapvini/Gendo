import React from "react";
import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Senha:", senha);
  };

  return (
    <>
      <div className="blue-line"></div>
      <div className="login-container">
        <div className="login-card">
          <p className="gendo-title">GENDO</p>
          <section className="login-section">
            <h2 className="login-subtitle">LOGIN</h2>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="text-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
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
