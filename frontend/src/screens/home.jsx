
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect, useRef } from "react";
import { DoctorCard } from "../components/doctorCard/doctorCard";
import { doctors, specialties } from "../data/doctorData";

import loginIcon from "../assets/login.png"

export function Home() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [showConsultationSection, setShowConsultationSection] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const consultationRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 3; 

  const navigate = useNavigate();

  const handleProfessionalLogin = () => {
    navigate("/login"); 
  };

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
            <p className="gendo-title">GENDO</p>
          </div>
          <div>
            <button className="slim-btn" onClick={handleProfessionalLogin}>
              Login Profissional
              <img src={loginIcon} className="icon"alt="icon login" />
            </button>
          </div>
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

            {/* REMOVIDO o if que exigia selectedState !== "all" para mostrar os doutores */}
            {currentDoctors.length > 0 ? (
              <>
                {currentDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onScheduleSelect={handleScheduleSelect}
                  />
                ))}

                {filteredDoctors.length > doctorsPerPage && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                      marginTop: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="blue-btn"
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </button>
                    <span>
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      className="blue-btn"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Próximo
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div>
                <p>Nenhum médico encontrado com os filtros selecionados.</p>
              </div>
            )}
          </section>

          {showConsultationSection && selectedSchedule && (
            <section ref={consultationRef} className="user-info-sec">
              <div className="info-form">
                <h2>Informações da Consulta</h2>
                <div className="doctor-info">
                  <div>
                    <h4>Médico:</h4>
                    <p>{selectedSchedule.doctor.name}</p>
                  </div>
                  <div>
                    <h4>Especialidade:</h4>
                    <p>{selectedSchedule.doctor.specialty}</p>
                  </div>
                  <div>
                    <h4>Data:</h4>
                    <p>{selectedSchedule.date}</p>
                  </div>
                  <div>
                    <h4>Horário:</h4>
                    <p>{selectedSchedule.time}</p>
                  </div>
                </div>
                <form className="consultation-form">
                  <h3>Dados para contato</h3>
                  <div>
                    <label>Nome completo:</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="text-input"
                    />
                  </div>
                  <div>
                    <label>E-mail:</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="text-input"
                    />
                  </div>

                  <div>
                    <label>Telefone:</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="text-input"
                    />
                  </div>

                  <div>
                    <label>Comentários adicionais:</label>
                    <textarea
                      name="message"
                      rows="4"
                      className="text-input"
                    />
                  </div>

                  <button type="submit" className="blue-btn">
                    Enviar solicitação
                  </button>
                </form>
              </div>
              <div className="smile">
                <p>:)</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
