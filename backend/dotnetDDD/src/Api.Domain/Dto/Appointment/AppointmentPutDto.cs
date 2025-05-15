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
        [Required(ErrorMessage = "Id é necessário para a atualização")]
        public Guid Id {get;set;}

        [Required(ErrorMessage = "DoctorId é campo obrigatório!")]
        public Guid DoctorId {get;set;}

        [Required(ErrorMessage = "PatientId é campo obrigatório!")]
        public Guid PatientId {get;set;}

        [Required(ErrorMessage = "Date é campo obrigatório!")]
        public DateTime DateTime {get;set;}

        [Required(ErrorMessage = "Status é campo obrigatório!")]
        public AppointmentStatusEnum Status {get;set;}
    }
}