import React, { useState, useEffect, useRef } from "react";
import { DoctorCard } from "../components/doctorCard/DoctorCard";
import { doctors, specialties } from "../data/doctorData";

export function Home() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [showConsultationSection, setShowConsultationSection] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const consultationRef = useRef(null);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5; // quantos médicos por página

  const states = Array.from(new Set(doctors.map((doc) => doc.address.state)));
  const filteredCities =
    selectedState === "all"
      ? Array.from(new Set(doctors.map((doc) => doc.address.city)))
      : Array.from(
          new Set(
            doctors
              .filter((doc) => doc.address.state === selectedState)
              .map((doc) => doc.address.city)
          )
        );

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value);
    setShowConsultationSection(false);
    setSelectedSchedule(null);
    setCurrentPage(1);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setShowConsultationSection(false);
    setSelectedSchedule(null);
    setCurrentPage(1);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("all");
    setShowConsultationSection(false);
    setSelectedSchedule(null);
    setCurrentPage(1);
  };

  useEffect(() => {
    let filtered = doctors;

    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(
        (doctor) =>
          doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
      );
    }

    if (selectedState !== "all") {
      filtered = filtered.filter(
        (doctor) => doctor.address.state === selectedState
      );
    }

    if (selectedCity !== "all") {
      filtered = filtered.filter(
        (doctor) => doctor.address.city === selectedCity
      );
    }

    setFilteredDoctors(filtered);
    setCurrentPage(1);
  }, [selectedSpecialty, selectedCity, selectedState]);

  useEffect(() => {
  if (showConsultationSection && consultationRef.current) {
    consultationRef.current.scrollIntoView({ behavior: "smooth" });
  }
  }, [showConsultationSection, selectedSchedule]);


  const handleScheduleSelect = ({ doctor, date, time }) => {
    setSelectedSchedule({ doctor, date, time });
    setShowConsultationSection(true);
  };

  // calcula índices para slice dos médicos da página atual
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

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

        <div className="slogan-section">
          <div className="slogan">
            <h1>GENDO</h1>
            <p>O seu agendamento online :)</p>
          </div>
        </div>

        <div className="sections">
          <section className="scheduler section">
            <h1>Agendar nova consulta</h1>
            <div className="scheduler-info">
              <div className="scheduler-location">
                <h3>Filtrar por região</h3>
                <div className="locations-input">
                  <div>
                    <label htmlFor="state-select">Estado:</label>
                    <div className="select-container">
                      <select
                        id="state-select"
                        value={selectedState}
                        onChange={handleStateChange}
                      >
                        <option value="all">Todos os estados</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="city-select">Cidade:</label>
                    <div className="select-container">
                      <select
                        id="city-select"
                        value={selectedCity}
                        onChange={handleCityChange}
                        disabled={selectedState === "all"}
                      >
                        <option value="all">Todas as cidades</option>
                        {filteredCities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3>Qual especialidade você procura?</h3>
                <div className="select-container">
                  <select
                    value={selectedSpecialty}
                    onChange={handleSpecialtyChange}
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty.value} value={specialty.value}>
                        {specialty.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {currentDoctors.length > 0 ? (
              currentDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onScheduleSelect={handleScheduleSelect}
                />
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <p>Nenhum médico encontrado com os filtros selecionados.</p>
              </div>
            )}

            {/* Paginação */}
            {filteredDoctors.length > doctorsPerPage && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1rem",
                  alignItems:"center"
                }}
              >
                <button className="blue-btn" onClick={goToPrevPage} disabled={currentPage === 1}>
                  Anterior
                </button>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
                <button className="blue-btn"onClick={goToNextPage} disabled={currentPage === totalPages}>
                  Próximo
                </button>
              </div>
            )}
          </section>

          {showConsultationSection && selectedSchedule && (
            <section ref={consultationRef} className="section">
              <h2>Informações da Consulta</h2>
              <p><strong>Médico:</strong> {selectedSchedule.doctor.name}</p>
              <p><strong>Especialidade:</strong> {selectedSchedule.doctor.specialty}</p>
              <p><strong>Data:</strong> {selectedSchedule.date}</p>
              <p><strong>Horário:</strong> {selectedSchedule.time}</p>

              <form className="consultation-form">
                <h3>Dados para contato</h3>
                <label>
                  Nome completo:
                  <input type="text" name="name" required />
                </label>
                <label>
                  E-mail:
                  <input type="email" name="email" required />
                </label>
                <label>
                  Telefone:
                  <input type="tel" name="phone" required />
                </label>
                <label>
                  Comentários adicionais:
                  <textarea name="message" rows="4" />
                </label>
                <button type="submit">Enviar solicitação</button>
              </form>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
