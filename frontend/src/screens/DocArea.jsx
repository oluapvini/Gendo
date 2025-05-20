import React from "react";
import { useNavigate } from "react-router-dom";
import loginIcon from "../assets/login.png";

export function DocArea() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  // Dados simulados
  const pendingRequests = [
    {
      id: 1,
      name: "Lucas Fernandes",
      email: "lucas@gmail.com",
      phone: "(11) 98765-4321",
      date: "21/05/2025",
      time: "14:00",
      comments: "Preciso de um retorno rápido.",
    },
    {
      id: 2,
      name: "Bruna Lima",
      email: "bruna@email.com",
      phone: "(21) 99876-1122",
      date: "22/05/2025",
      time: "10:30",
      comments: "",
    },
  ];

  const scheduledAppointments = [
    {
      id: 1,
      patient: "João Silva",
      date: "21/05/2025",
      time: "09:00",
    },
    {
      id: 2,
      patient: "Maria Oliveira",
      date: "21/05/2025",
      time: "10:30",
    },
    {
      id: 3,
      patient: "Pedro Martins",
      date: "21/05/2025",
      time: "13:00",
    },
    {
      id: 4,
      patient: "Ana Souza",
      date: "21/05/2025",
      time: "15:45",
    },
  ];

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
                  <p><strong>{appt.time}</strong> - {appt.patient} <span style={{ fontStyle: "italic" }}>({appt.date})</span></p>
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
                    <p><strong>Paciente:</strong> {req.name}</p>
                    <p><strong>Data:</strong> {req.date} às {req.time}</p>
                    <p><strong>Email:</strong> {req.email}</p>
                    <p><strong>Telefone:</strong> {req.phone}</p>
                    <p> <strong>Comentário:</strong> {req.comments ? req.comments : 'Sem comentário'}</p>
                    <button className="dark-btn">Confirmar Consulta</button>
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
