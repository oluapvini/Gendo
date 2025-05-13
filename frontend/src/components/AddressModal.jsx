import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AddressModal({ isOpen, onClose, currentAddress, onSave }) {
  const [address, setAddress] = useState(currentAddress || {
    cep: "",
    city: "",
    state: "",
    street: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const searchCEP = async () => {
    if (!address.cep || address.cep.length !== 8) {
      toast({
        title: "CEP inválido",
        description: "Por favor, informe um CEP válido com 8 dígitos.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${address.cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "O CEP informado não foi encontrado.",
          variant: "destructive"
        });
        return;
      }
      
      setAddress({
        ...address,
        city: data.localidade,
        state: data.uf,
        street: `${data.logradouro}, ${data.bairro}`
      });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      toast({
        title: "Erro ao buscar CEP",
        description: "Ocorreu um erro ao buscar o CEP. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(address);
    onClose();
    toast({
      title: "Endereço atualizado",
      description: "Seu endereço foi atualizado com sucesso!"
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="appointment-overlay" onClick={onClose}></div>
      <div className="appointment-success" style={{ width: "90%", maxWidth: "500px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <MapPin size={24} style={{ marginRight: "10px", color: "#124EE6" }} />
          <h3 style={{ margin: 0 }}>Atualizar Endereço</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field" style={{ marginBottom: "15px" }}>
            <label htmlFor="cep">CEP</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                id="cep"
                name="cep"
                value={address.cep}
                onChange={handleChange}
                className="form-input"
                style={{ flex: 1 }}
                placeholder="Somente números"
                maxLength={8}
              />
              <button 
                type="button" 
                onClick={searchCEP} 
                className="blue-btn" 
                style={{ padding: "0.75rem", width: "auto" }}
                disabled={loading}
              >
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>

          <div className="form-field" style={{ marginBottom: "15px" }}>
            <label htmlFor="city">Cidade</label>
            <input
              id="city"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="form-input"
              placeholder="Cidade"
            />
          </div>

          <div className="form-field" style={{ marginBottom: "15px" }}>
            <label htmlFor="state">Estado</label>
            <input
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
              className="form-input"
              placeholder="Estado"
              maxLength={2}
            />
          </div>

          <div className="form-field" style={{ marginBottom: "15px" }}>
            <label htmlFor="street">Endereço</label>
            <input
              id="street"
              name="street"
              value={address.street}
              onChange={handleChange}
              className="form-input"
              placeholder="Rua, número, bairro"
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

export default AddressModal;