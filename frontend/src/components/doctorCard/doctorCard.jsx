import React, { useState } from "react";
import "./doctorCard.css";
import { Calendar, MapPin, Clock, User, Mail, ChevronLeft, Search, Menu } from 'lucide-react';

const generateNextDates = (start, count) => {
  const dates = [];
  const date = new Date(start);
  while (dates.length < count) {
    dates.push(new Date(date)); // Adiciona todos os dias
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

const formatDate = (date) =>
  date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

const formatWeekday = (date) =>
  date.toLocaleDateString("pt-BR", { weekday: "short" });

export function DoctorCard({ doctor }) {
  const [selected, setSelected] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  const allDates = generateNextDates(new Date(), 10);
  const visibleCount = 5;
  const visibleDays = allDates.slice(startIndex, startIndex + visibleCount);

  const schedule = {
    [formatDate(allDates[0])]: ["08:30", "09:30", "10:30", "11:00", "12:00"],
    [formatDate(allDates[1])]: ["07:00", "09:30", "11:30", "13:00"],
    [formatDate(allDates[2])]: ["09:30", "10:30"],
    [formatDate(allDates[3])]: ["09:30"],
    [formatDate(allDates[4])]: ["09:30"],
    [formatDate(allDates[5])]: ["08:00", "10:00", "11:30"],
    [formatDate(allDates[6])]: ["09:00", "10:00", "14:00"],
    [formatDate(allDates[7])]: [],
    [formatDate(allDates[8])]: ["09:00", "12:00"],
    [formatDate(allDates[9])]: ["08:00", "10:00"]
  };

  // Todos os horários possíveis
  const allTimes = Array.from(new Set(Object.values(schedule).flat())).sort();

  const handleClick = (date, time) => {
    setSelected({ date, time });
    alert(`Consulta marcada para ${date} às ${time}`);
  };

  const canGoBack = startIndex > 0;
  const canGoNext = startIndex + visibleCount < allDates.length;

  return (
    <div className="card">
      <div className="card-info">
        <div className="card-info-id">
          <div className="perfil-img">
              <img src={doctor.image} alt={`Foto de ${doctor.name}`} />
            </div>
            <div>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
            </div>
          </div>
          <div className="card-info-details">
            <h3>Endereço</h3>
            <div>
              <p>{doctor.address}</p>
            </div>
            <div>
              <p>{doctor.serviceType}</p>
            </div>
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
                      const dateStr = formatDate(day);
                      const isAvailable = schedule[dateStr]?.includes(time);
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
                            <div>-</div> // Exibe '-' quando o horário não estiver disponível
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
