import React, { useState } from "react";
import "../../App.css";



const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    genero: "",
    cpf: "",
    telefone: "",
    email: "",
    endereco: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.dataNascimento) newErrors.dataNascimento = "Data de nascimento obrigatória";
    if (!formData.genero) newErrors.genero = "Selecione o gênero";
    if (!formData.telefone || formData.telefone.length < 10) newErrors.telefone = "Telefone inválido";
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "E-mail inválido";
    if (!formData.endereco) newErrors.endereco = "Endereço é obrigatório";
    if (!formData.cpf || formData.cpf.length < 11) newErrors.cpf = "CPF inválido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Dados enviados:", formData);
      alert("Formulário enviado com sucesso!");
    }
  };

  return (
    <>
      <div className="blue-line"></div>
      <header className="home-header">
            <div>
                <p>&lt;</p>
                <p className="gendo-title">GENDO</p>
            </div>
      </header>

    <div className="form-wrapper">
      <div className="form-card">
        <h2 className="form-title">Informações Pessoais</h2>
        <form className="form-body" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="form-input"
              placeholder="Digite seu nome"
            />
            {errors.nome && <span className="form-error">{errors.nome}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="dataNascimento">Data de nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              className="form-input"
            />
            {errors.dataNascimento && <span className="form-error">{errors.dataNascimento}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="genero">Gênero</label>
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
            {errors.genero && <span className="form-error">{errors.genero}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="form-input"
              placeholder="000.000.000-00"
            />
            {errors.cpf && <span className="form-error">{errors.cpf}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="form-input"
              placeholder="(00) 00000-0000"
            />
            {errors.telefone && <span className="form-error">{errors.telefone}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="exemplo@email.com"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="endereco">Endereço</label>
            <textarea
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="form-input"
              placeholder="Rua, número, bairro, cidade"
              rows="3"
            />
            {errors.endereco && <span className="form-error">{errors.endereco}</span>}
          </div>

          <button type="submit" className="form-button">Continuar</button>
        </form>
      </div>
    </div>
    </>
    
  );
};

export default ContactForm;
