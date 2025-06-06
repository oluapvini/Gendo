import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginIcon from "../assets/login.png";
import axios from "axios";
import { LINK } from "../utils/link";

export function DocArea() {
  const navigate = useNavigate();

  const [pendingRequests, setPendingRequests] = useState([]);
  const [scheduledAppointments, setScheduledAppointments] = useState([]);

  const [availableDate, setAvailableDate] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
    fetchScheduledAppointments();
    fetchAvailableSlots();
  }, []);

  const fetchScheduledAppointments = async () => {
    const doctorId = localStorage.getItem("gendo@doctorId");
    const token = localStorage.getItem("gendo@acessToken");

    const response = await axios.post(
      LINK + "/api/Appointment/GetAllByFilter",
      {
        doctorId,
        status: 3,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response?.data) setScheduledAppointments(response.data);
  };

  const fetchPendingRequests = async () => {
    const doctorId = localStorage.getItem("gendo@doctorId");
    const token = localStorage.getItem("gendo@acessToken");

    const response = await axios.post(
      LINK + "/api/Appointment/GetAllByFilter",
      {
        doctorId,
        status: 2,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response?.data) setPendingRequests(response.data);
  };

  const fetchAvailableSlots = async () => {
    const doctorId = localStorage.getItem("gendo@doctorId");
    const token = localStorage.getItem("gendo@acessToken");

    try {
      const response = await axios.get(LINK + "/api/AvailableSlots", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { doctorId },
      });

      if (response?.data) setAvailableSlots(response.data);
    } catch (err) {
      console.error("Erro ao buscar horários disponíveis", err);
    }
  };

  const handleAddAvailableSlot = async () => {
    if (!availableDate || !availableTime) {
      alert("Por favor, selecione data e hora.");
      return;
    }

    const doctorId = localStorage.getItem("gendo@doctorId");
    const token = localStorage.getItem("gendo@acessToken");
    const dateTime = new Date(`${availableDate}T${availableTime}`);

    try {
      await axios.post(
        LINK + "/api/AvailableSlots",
        {
          doctorId,
          dateTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAvailableDate("");
      setAvailableTime("");
      fetchAvailableSlots();
    } catch (err) {
      console.error("Erro ao adicionar horário disponível", err);
    }
  };

  const handleRemoveSlot = async (slotId) => {
    const token = localStorage.getItem("gendo@acessToken");

    try {
      await axios.delete(LINK + `/api/AvailableSlots/${slotId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAvailableSlots();
    } catch (err) {
      console.error("Erro ao remover horário disponível", err);
    }
  };

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
        doctorId,
        status: 3,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchPendingRequests();
    fetchScheduledAppointments();
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
            <button className="slim-btn" onClick={handleLogout}>
              Sair
              <img src={loginIcon} className="icon" alt="logout icon" />
            </button>
          </div>
        </header>
      </div>

      <div className="slogan-section" style={{ backgroundColor: "black" }}>
        <div className="slogan">
          <h1>GENDO</h1>
          <p>Gerencie suas consultas e acompanhe as solicitações :)</p>
        </div>
      </div>

      <div className="sections">
        <section className="scheduler section">
          <h2>Horários Disponíveis</h2>
          <div style={{ marginBottom: 12 }}>
            <input
              type="date"
              value={availableDate}
              onChange={(e) => setAvailableDate(e.target.value)}
            />
            <input
              type="time"
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
            />
            <button className="dark-btn" onClick={handleAddAvailableSlot}>
              Adicionar horário
            </button>
          </div>

          {availableSlots.length > 0 ? (
            <ul>
              {availableSlots.map((slot) => (
                <li key={slot.id}>
                  {new Date(slot.dateTime).toLocaleString()}
                  <button
                    onClick={() => handleRemoveSlot(slot.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Você ainda não adicionou horários disponíveis.</p>
          )}
        </section>

        <section className="scheduler section">
          <h2>Agenda de Consultas</h2>
          {scheduledAppointments.length > 0 ? (
            <ul className="consulta-list">
              {scheduledAppointments.map((appt) => (
                <li key={appt.id}>
                  <p>
                    <strong>
                      {new Date(appt.dateTime).toLocaleTimeString()}
                    </strong>{" "}
                    - {appt.patientName}{" "}
                    <span style={{ fontStyle: "italic" }}>
                      ({new Date(appt.dateTime).toLocaleDateString()})
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Não há consultas agendadas para hoje.</p>
          )}
        </section>

        <section className="scheduler user-info-sec">
          <div className="list">
            <h2>Solicitações Pendentes</h2>
            {pendingRequests.length > 0 ? (
              <div className="consulta-list">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="consulta-item">
                    <p>
                      <strong>Paciente:</strong> {req.patientName}
                    </p>
                    <p>
                      <strong>Data:</strong>{" "}
                      {new Date(req.dateTime).toLocaleDateString()} às{" "}
                      {new Date(req.dateTime).toLocaleTimeString()}
                    </p>
                    <p>
                      <strong>Email:</strong> {req.patientEmail}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {req.patientPhone}
                    </p>
                    <button
                      className="dark-btn"
                      onClick={() => handleConfirmAppointment(req)}
                    >
                      Confirmar Consulta
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Não há solicitações pendentes no momento.</p>
            )}
          </div>

          <div className="smile" style={{ backgroundColor: "black" }}>
            <p>:)</p>
          </div>
        </section>
      </div>
    </>
  );
}
