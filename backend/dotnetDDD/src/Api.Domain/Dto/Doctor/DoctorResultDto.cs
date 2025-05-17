using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Entities;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Dto.Doctor
{
    public class DoctorResultDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string CRM { get; set; }
        public string Specialty { get; set; }
        public AddressEntity Address { get; set; }
        public string ServiceType { get; set; }
        public ICollection<AppointmentEntity>? Appointments { get; set; }
        public List<ScheduleDto> Schedule { get; set; } = new List<ScheduleDto>();
    }
}