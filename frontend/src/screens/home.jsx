import { useNavigate } from "react-router-dom";

import React, { useState, useEffect, useRef } from "react";
import { DoctorCard } from "../components/doctorCard/DoctorCard";
import axios from "axios";
import "./home.css"

import loginIcon from "../assets/login.png"
import { LINK } from "../utils/link";

export function Home() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [showConsultationSection, setShowConsultationSection] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    message: "",
  });

  const consultationRef = useRef(null);

  const formatDate = (isoDate) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}`;
  };

  useEffect(() => {
    fetchDoctors();
    fetchSpecialties();
  }, []);

  // Paginação
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

  const fetchSpecialties = async () => {
    try {
      const response = await axios.get(LINK + "/api/Doctor/Specialties");
      const data = response.data;

      const formattedData = data.map(specialty => ({
        label: specialty, 
        value: specialty
      }))

      setSpecialties([
        { value: "all", label: "Todas as especialidades" },
        ...formattedData
      ]);
    } catch (e) {
      console.error("Erro ao buscar especialidades dos doutores", e)
    }
  }

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(LINK+ "/api/Doctor");
      const data = response.data;

      const transformed = data.map((medico) => ({
        id: medico.id,
        name: `Dr(a). ${medico.name}`,
        specialty: medico.specialty,
        image: "/", // imagem padrão, substitua se necessário
        address: {
          street: medico.address?.street || "",
          city: medico.address?.city || "",
          state: medico.address?.state || ""
        },
        serviceType: medico.serviceType || "Consulta padrão",
        rating: 4.6, // valor fixo por enquanto
        schedule: (medico.schedule || []).reduce((acc, item) => {
          const date = formatDate(item.label);
          acc[date] = item.values;
          return acc;
        }, {})
      }));

      setDoctors(transformed);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("selectedSchedule", selectedSchedule)

    const today = new Date();

    const year = today.getFullYear();
    const month = selectedSchedule.date.slice(3,5);
    const day = selectedSchedule.date.slice(0,2);

    const formattedDateTime = year + "-" + month + "-" + day + "T" + selectedSchedule.time;

    try {
      await axios.put(LINK + "/api/Appointment", {
        doctorId: selectedSchedule.doctor.id, // ou outro identificador
        dateTime: formattedDateTime,
        status: 2,
        ...formData,
      });

      alert("Solicitação enviada com sucesso!");

      fetchDoctors();
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar solicitação.");
    }
  };

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
  }, [selectedSpecialty, selectedCity, selectedState, doctors]);

  // Scroll automático para a seção do formulário quando ela abrir
  useEffect(() => {
    if (showConsultationSection && consultationRef.current) {
      consultationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showConsultationSection, selectedSchedule]);

  const handleScheduleSelect = ({ doctor, date, time }) => {
    setSelectedSchedule({ doctor, date, time });
    setShowConsultationSection(true);

    // Scroll imediato após atualizar estados (opcional)
    setTimeout(() => {
      if (consultationRef.current) {
        consultationRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
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
            <form
              className="consultation-form"
              onSubmit={handleSubmit}
              ref={consultationRef} // <-- ref adicionada aqui
            >
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

              <h3>Dados para contato</h3>
              <label>
                Nome completo:
                <input type="text" name="patientName" required value={formData.patientName} onChange={handleChange} />
              </label>
              <label>
                E-mail:
                <input type="email" name="patientEmail" required value={formData.patientEmail} onChange={handleChange} />
              </label>
              <label>
                Telefone:
                <input type="tel" name="patientPhone" required value={formData.patientPhone} onChange={handleChange} />
              </label>
              <label>
                Comentários adicionais:
                <textarea name="message" rows="4" value={formData.message} onChange={handleChange} />
              </label>
              <button type="submit">Enviar solicitação</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
