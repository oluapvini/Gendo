using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto.Setor;
using Api.Domain.Entities;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Dto.Appointment
{
    public class AppointmentResultDto
    {
        public Guid Id {get;set;}
        public DateTime DateTime {get;set;}
        public AppointmentStatusEnum Status {get;set;}
    }
}