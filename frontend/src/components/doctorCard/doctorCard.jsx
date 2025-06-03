import React, { useState } from "react";
import "./doctorCard.css";
import doctorImage from "../../assets/doctor.svg";

const generateNextDates = (start, count) => {
  const dates = [];
  const date = new Date(start);
  while (dates.length < count) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

const formatDate = (date) =>
  date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

const formatWeekday = (date) =>
  date.toLocaleDateString("pt-BR", { weekday: "short" });

export function DoctorCard({ doctor, onScheduleSelect }) {
  const [selected, setSelected] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  // Determina a primeira data disponível (>= hoje)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const scheduleDates = Object.keys(doctor.schedule)
    .map((str) => {
      const [day, month] = str.split("/").map(Number);
      const date = new Date(today.getFullYear(), month - 1, day);
      date.setHours(0, 0, 0, 0);
      return date;
    })
    .filter((d) => d >= today)
    .sort((a, b) => a - b);

  const firstDate = scheduleDates.length > 0 ? scheduleDates[0] : today;

  // Gera 30 dias a partir da primeira data disponível
  const allDates = generateNextDates(firstDate, 30);

  // Exibe 7 dias por vez
  const visibleCount = 7;
  const visibleDays = allDates.slice(startIndex, startIndex + visibleCount);

  // Horários únicos ordenados
  const allTimes = Array.from(
    new Set(Object.values(doctor.schedule).flat())
  ).sort();

  const handleClick = (date, time) => {
    setSelected({ date, time });
    onScheduleSelect?.({ doctor, date, time });
  };

  const canGoBack = startIndex > 0;
  const canGoNext = startIndex + visibleCount < allDates.length;

  return (
    <div className="card">
      <div className="card-info">
        <div className="card-info-id">
          <div className="perfil-img">
            <img src={doctorImage} alt={`Foto do doutor`} width={40} />
          </div>
          <div>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
          </div>
        </div>
        <div className="card-info-details">
          <h3>Endereço</h3>
          
            <p>{doctor.address.street}</p>
            <p>{doctor.address.city}, {doctor.address.state}</p>
            
         
        </div>
      </div>

      <div className="vertical-div"></div>

      <div className="card-schedule">
        <div className="schedule-wrapper">
          <div className="schedule-header">
            <button
              className="nav-button inline left"
              onClick={() => setStartIndex(startIndex - visibleCount)}
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
                {allTimes.map((time, i) => (
                  <tr key={i}>
                    {visibleDays.map((day, j) => {
                      console.log("doctor.schedule", doctor.schedule)
                      const dateStr = formatDate(day);
                      // verifica se o horário está disponível na agenda do médico para a data
                      const isAvailable =
                        doctor.schedule[dateStr]?.includes(time) || false;
                      const isSelected =
                        selected?.date === dateStr && selected?.time === time;
                      return (
                        <td key={j}>
                          {isAvailable ? (
                            <div
                              className={`time-slot ${
                                isSelected ? "selected" : ""
                              }`}
                              onClick={() => handleClick(dateStr, time)}
                            >
                              {time}
                            </div>
                          ) : (
                            <div>-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              <tbody>
                {allTimes.map((time, i) => (
                  <tr key={i}>
                    {visibleDays.map((day, j) => {
                      const dateStr = formatDate(day);
                      const isAvailable = doctor.schedule[dateStr]?.includes(time);
                      const isSelected =
                        selected?.date === dateStr && selected?.time === time;
                      return (
                        <td key={j}>
                          {isAvailable ? (
                            <div
                              className={`time-slot ${isSelected ? "selected" : ""}`}
                              onClick={() => handleClick(dateStr, time)}
                            >
                              {time}
                            </div>
                          ) : (
                            <div>-</div>
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
              onClick={() => setStartIndex(startIndex + visibleCount)}
              disabled={!canGoNext}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}