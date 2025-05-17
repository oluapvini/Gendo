using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Entities.Enums;
using Newtonsoft.Json;

namespace Api.Domain.Entities
{
    public class AppointmentEntity : BaseEntity
    {
        [JsonIgnore]
        public DoctorEntity Doctor {get;set;}
        public Guid DoctorId {get;set;}
        public Guid? PatientId {get;set;}
        public DateTime DateTime {get;set;}
        public AppointmentStatusEnum Status { get; set; }
    }
}