import React from "react";
import { useState } from "react";
import { DoctorCard } from "../components/doctorCard/DoctorCard";
import { useEffect } from "react";
import { doctors, specialties, userData as initialUserData } from "../data/doctorData";

export function Home() {
    const [selectedSpecialty, setSelectedSpecialty] = useState("all");
    const [filteredDoctors, setFilteredDoctors] = useState(doctors);

    const handleSpecialtyChange = (e) => {
        setSelectedSpecialty(e.target.value);
    };
     useEffect(() => {
    if (selectedSpecialty === "all") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(
        doctor => doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
      );
      setFilteredDoctors(filtered);
    }
  }, [selectedSpecialty]);

    return (
      
    <>
        <div className="blue-line"></div>
        <div className="home">
            <header className="home-header">
                <div>
                    <p>&lt;</p>
                    <p className="gendo-title">GENDO</p>
                </div>
                <img src="#" alt="icone agenda" />
                <h3>Minha agenda</h3>
            </header>
            <div className="user-info">
                <div className="perfil-img main-perfil-img">
                    <img src="" alt="imagem perfil" />
                </div>
                <div class="user-info-datails">
                    <h3>
                        Meu Nome da Silva
                    </h3>
                    <p>momepessoa15@gmail.com</p>
                    <div class="user-type">
                        <p>Paciente</p>
                    </div>
                </div>
                <button className="dark-btn">Editar perfil</button>
            </div>
            <section className="scheduler section">
                <h1>Agendar nova consulta</h1>
                <div className="scheduler-info">
                    <div className="scheduler-location">
                        <h3>Região</h3>
                        <p>CEP:2737237</p>
                        <p>Rio de janero, RJ</p>
                        <p>Rua general almofadas, 2034</p>
                        <button className="blue-btn">Alterar</button>
                    </div>
                    <div>
                        <h3>Qual especialidade você procura?</h3>
                        <div className="select-container">
                            <select value={selectedSpecialty} onChange={handleSpecialtyChange}>
                                {specialties.map((specialty) => (
                                <option key={specialty.value} value={specialty.value}>
                                    {specialty.label}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))
                ) : (
                  <div style={{ textAlign: "center", padding: "2rem" }}>
                    <p>Nenhum médico encontrado para esta especialidade.</p>
                  </div>
                )}
              </section>
        </div>
    </>
  );
}


