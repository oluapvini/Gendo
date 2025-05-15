using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Entities
{
    public class DoctorEntity : BaseEntity
    {
        public Guid UserId { get; set; }
        public string CRM { get; set; }
        public string Specialty {get;set;}
    }
}