import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginIcon from "../assets/login.png";
import axios from "axios";
import { LINK } from "../utils/link";

export function DocArea() {
  const navigate = useNavigate();

  const [pendingRequests, setPendingRequests] = useState([])
  const [scheduledAppointments, setScheduledAppointments] = useState([])

  useEffect(() => {
    fetchPendingRequests();
    fetchScheduledAppointments();
  }, [])

  // Dados simulados
  // const pendingRequests = [
  //   {
  //     id: 1,
  //     name: "Lucas Fernandes",
  //     email: "lucas@gmail.com",
  //     phone: "(11) 98765-4321",
  //     date: "21/05/2025",
  //     time: "14:00",
  //   },
  //   {
  //     id: 2,
  //     name: "Bruna Lima",
  //     email: "bruna@email.com",
  //     phone: "(21) 99876-1122",
  //     date: "22/05/2025",
  //     time: "10:30",
  //   },
  // ];

  // const scheduledAppointments = [
  //   {
  //     id: 1,
  //     patient: "João Silva",
  //     date: "21/05/2025",
  //     time: "09:00",
  //   },
  //   {
  //     id: 2,
  //     patient: "Maria Oliveira",
  //     date: "21/05/2025",
  //     time: "10:30",
  //   },
  //   {
  //     id: 3,
  //     patient: "Pedro Martins",
  //     date: "21/05/2025",
  //     time: "13:00",
  //   },
  //   {
  //     id: 4,
  //     patient: "Ana Souza",
  //     date: "21/05/2025",
  //     time: "15:45",
  //   },
  // ];

  const fetchScheduledAppointments = async () => {
    const doctorId = localStorage.getItem("gendo@doctorId");
    const token = localStorage.getItem("gendo@acessToken");

    const response = await axios.post(LINK + "/api/Appointment/GetAllByFilter", {
      doctorId,
      status: 3
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if(response && response.data) {
      setScheduledAppointments(response.data);
    }
  }

  const fetchPendingRequests = async () => {
    const doctorId = localStorage.getItem("gendo@doctorId");
    const token = localStorage.getItem("gendo@acessToken");

    const response = await axios.post(LINK + "/api/Appointment/GetAllByFilter", {
      doctorId,
      status: 2
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if(response && response.data) {
      setPendingRequests(response.data);
    }
  }

  const handleLogout = () => {
    navigate("/");
  };

  const handleConfirmAppointment = async (req) => {
    const doctorId = localStorage.getItem("gendo@doctorId");
    const token = localStorage.getItem("gendo@acessToken");
    
    await axios.put(
      LINK + "api/Appointment", 
      {
        ...req,
        doctorId, // ou outro identificador
        status: 3,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchPendingRequests();
    fetchScheduledAppointments();
  }

  return (
    <>
      <div className="blue-line"></div>
      <div className="home">
        <header className="home-header">
          <div>
            <p className="gendo-title">GENDO</p>
          </div>
          <div>
            <button className="slim-btn" onClick={handleLogout}>
              Sair
              <img src={loginIcon} className="icon" alt="logout icon" />
            </button>
          </div>
        </header>
      </div>

      <div className="slogan-section" style={{backgroundColor: "black"}}>
        <div className="slogan">
          <h1>GENDO</h1>
          <p>Gerencie suas consultas e acompanhe as solicitações :)</p>
        </div>
      </div>

      <div className="sections">
        <section className="scheduler section">
          <h2>Agenda de Consultas</h2>
          {scheduledAppointments.length > 0 ? (
            <ul className="consulta-list">
              {scheduledAppointments.map((appt) => (
                <li key={appt.id}>
                  <p><strong>{new Date(appt.dateTime).toLocaleTimeString()}</strong> - {appt.patientName} <span style={{ fontStyle: "italic" }}>({new Date(appt.dateTime).toLocaleDateString()})</span></p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Não há consultas agendadas para hoje.</p>
          )}
        </section>

        <section className="scheduler user-info-sec" >
          <div className="list">
            <h2>Solicitações Pendentes</h2>
            {pendingRequests.length > 0 ? (
              <div className="consulta-list">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="consulta-item">
                    <p><strong>Paciente:</strong> {req.patientName}</p>
                    <p><strong>Data:</strong> {new Date(req.dateTime).toLocaleDateString()} às {new Date(req.dateTime).toLocaleTimeString()}</p>
                    <p><strong>Email:</strong> {req.patientEmail}</p>
                    <p><strong>Telefone:</strong> {req.patientPhone}</p>
                    <button className="dark-btn" onClick={() => handleConfirmAppointment(req)}>Confirmar Consulta</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Não há solicitações pendentes no momento.</p>
            )}
          </div>

          <div className="smile" style={{backgroundColor: "black"}}>
                <p>:)</p>
          </div>
        </section>

      </div>
    </>
  );
}
