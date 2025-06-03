using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Dto.Appointment
{
    public class AppointmentPostDto
    {
        [Required(ErrorMessage = "DoctorId é campo obrigatório!")]
        public Guid DoctorId {get;set;}

        [Required(ErrorMessage = "Date é campo obrigatório!")]
        public DateTime DateTime {get;set;}
        
        public AppointmentStatusEnum Status {get;set;} = AppointmentStatusEnum.Pending;
    }
}