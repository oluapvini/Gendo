using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto.Doctor;
using Api.Domain.Dto.Setor;
using Api.Domain.Entities;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Dto.Appointment
{
    public class LastAppointmentByDoctorsDto
    {
        public DoctorResultAppointmentDto Doctor { get; set; }
        public AppointmentResultDto LastAppointment { get; set; }
    }
}