using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Dto.Appointment
{
    public class AppointmentPutDto
    {
        public Guid Id { get; set; } = Guid.Empty;
        [Required(ErrorMessage = "DoctorId é campo obrigatório!")]
        public Guid DoctorId {get;set;}

        [Required(ErrorMessage = "PatientName é campo obrigatório!")]
        public string PatientName { get; set; }

        [Required(ErrorMessage = "PatientEmail é campo obrigatório!")]
        public string PatientEmail { get; set; }

        [Required(ErrorMessage = "PatientPhone é campo obrigatório!")]
        public string PatientPhone { get; set; }

        [Required(ErrorMessage = "Date é campo obrigatório!")]
        public DateTime DateTime {get;set;}

        [Required(ErrorMessage = "Status é campo obrigatório!")]
        public AppointmentStatusEnum Status {get;set;}
    }
}