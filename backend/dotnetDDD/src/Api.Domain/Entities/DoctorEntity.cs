using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Api.Domain.Entities
{
    public class DoctorEntity : BaseEntity
    {
        public Guid UserId { get; set; }
        [JsonIgnore]
        public UserEntity User { get; set; }
        public string CRM { get; set; }
        public string Specialty {get;set;}
        
        [JsonIgnore]
        public ICollection<AppointmentEntity> Appointments {get;set;}
    }
}