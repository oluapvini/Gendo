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

  // Controle de paginação dos dias visíveis na tabela
  const visibleCount = 5;
  const [startIndex, setStartIndex] = useState(0);
  const allDays = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const visibleDays = allDays.slice(startIndex, startIndex + visibleCount);
  const canGoBack = startIndex > 0;
  const canGoNext = startIndex + visibleCount < allDays.length;
  const rowsCount = 6; // Máximo de horários por dia
  const [selected, setSelected] = useState(null);

  // Dados locais mockados para horários disponíveis
  const mockSlots = [
    {
      id: 1,
      dateTime: new Date("2025-06-10T09:00:00").toISOString(),
    },
    {
      id: 2,
      dateTime: new Date("2025-06-10T10:30:00").toISOString(),
    },
    {
      id: 3,
      dateTime: new Date("2025-06-11T14:00:00").toISOString(),
    },
  ];

  useEffect(() => {
    fetchPendingRequests();
    fetchScheduledAppointments();

    // Use dados locais para horários disponíveis
    setAvailableSlots(mockSlots);
  }, []);

  const fetchScheduledAppointments = async () => {
    const doctorId = localStorage.getItem("gendo@doctorId");
    const token = localStorage.getItem("gendo@acessToken");

    try {
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
    } catch (error) {
      console.error("Erro ao buscar consultas agendadas:", error);
    }
  };

  const fetchPendingRequests = async () => {
    const doctorId = localStorage.getItem("gendo@doctorId");
    const token = localStorage.getItem("gendo@acessToken");

    try {
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
    } catch (error) {
      console.error("Erro ao buscar solicitações pendentes:", error);
    }
  };

  const handleRemoveSlot = (slotId) => {
    const updatedSlots = availableSlots.filter((slot) => slot.id !== slotId);
    setAvailableSlots(updatedSlots);
  };

  const handleAddAvailableSlot = () => {
    if (!availableDate || !availableTime) {
      alert("Por favor, selecione data e hora.");
      return;
    }

    const dateTime = new Date(`${availableDate}T${availableTime}`);
    const newSlot = {
      id: Date.now(),
      dateTime: dateTime.toISOString(),
    };

    setAvailableSlots([...availableSlots, newSlot]);
    setAvailableDate("");
    setAvailableTime("");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleConfirmAppointment = async (req) => {
    const doctorId = localStorage.getItem("gendo@doctorId");
    const token = localStorage.getItem("gendo@acessToken");

    try {
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
    } catch (error) {
      console.error("Erro ao confirmar consulta:", error);
    }
  };

  // Formatação para exibir dia e mês (dd/mm)
  const formatDate = (date) =>
    date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

  // Formatação do dia da semana abreviado (ex: seg, ter, qua)
  const formatWeekday = (date) =>
    date.toLocaleDateString("pt-BR", { weekday: "short" });

  // Obtém os horários disponíveis para um dia específico
  const getTimesForDay = (dateStr) => {
    return availableSlots
      .filter((slot) => {
        const slotDate = new Date(slot.dateTime);
        return formatDate(slotDate) === dateStr;
      })
      .map((slot) =>
        new Date(slot.dateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
  };

  // Ao clicar num horário, seleciona e remove da lista de disponíveis
  const handleClick = (dateStr, time) => {
    setSelected({ date: dateStr, time });
    // Converter dd/mm para yyyy-mm-dd para criar o Date corretamente
    const [day, month] = dateStr.split("/");
    const dateISO = `2025-${month}-${day}T${time}`; // ano fixo para mock
    const dateTime = new Date(dateISO);

    const slotId = availableSlots.find(
      (slot) => slot.dateTime === dateTime.toISOString()
    )?.id;

    if (slotId) {
      handleRemoveSlot(slotId);
    }
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

          <div className="input-group">
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
            <div className="card-schedule">
              <div className="schedule-header">
                <button
                  className="nav-button inline left"
                  onClick={() => setStartIndex(Math.max(startIndex - visibleCount, 0))}
                  disabled={!canGoBack}
                >
                  {"<"}
                </button>
                <table className="schedule-table">
                  <thead>
                    <tr>
                      {visibleDays.map((day, idx) => (
                        <th key={idx}>
                          <div className="date-header">
                            <div className="weekday">{formatWeekday(day)}</div>
                            <div className="day">{formatDate(day)}</div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(rowsCount)].map((_, rowIdx) => (
                      <tr key={rowIdx}>
                        {visibleDays.map((day, colIdx) => {
                          const dateStr = formatDate(day);
                          const timesForDay = getTimesForDay(dateStr);
                          const time = timesForDay[rowIdx] || "-";
                          const isSelected =
                            selected?.date === dateStr && selected?.time === time;
                          return (
                            <td key={colIdx}>
                              {time !== "-" ? (
                                <div
                                  className={`time-slot delete-func ${isSelected ? "selected" : ""}`}
                                  onClick={() => handleClick(dateStr, time)}
                                >
                                  {time}
                                </div>
                              ) : (
                                <div className="disabled">-</div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="nav-button inline right"
                  onClick={() =>
                    setStartIndex(
                      Math.min(startIndex + visibleCount, allDays.length - visibleCount)
                    )
                  }
                  disabled={!canGoNext}
                >
                  {">"}
                </button>
              </div>
            </div>
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
                      {new Date(appt.dateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
