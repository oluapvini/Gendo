import React, { useState } from "react";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ProfileModal({ isOpen, onClose, currentUser, onSave }) {
  const [user, setUser] = useState(currentUser || {
    name: "",
    email: "",
    phone: "",
    type: "Paciente"
  });
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
    onClose();
    toast({
      title: "Perfil atualizado",
      description: "Seus dados foram atualizados com sucesso!"
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="appointment-overlay" onClick={onClose}></div>
      <div className="appointment-success" style={{ width: "90%", maxWidth: "500px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <User size={24} style={{ marginRight: "10px", color: "#124EE6" }} />
          <h3 style={{ margin: 0 }}>Editar Perfil</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field" style={{ marginBottom: "15px" }}>
            <label htmlFor="name">Nome Completo</label>
            <input
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className="form-field" style={{ marginBottom: "15px" }}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              className="form-input"
              placeholder="seu-email@exemplo.com"
              required
            />
          </div>

          <div className="form-field" style={{ marginBottom: "15px" }}>
            <label htmlFor="phone">Telefone</label>
            <input
              id="phone"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
            <button type="submit" className="blue-btn">Salvar</button>
            <button type="button" className="dark-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfileModal;
