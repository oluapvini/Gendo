using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Entities
{
    public class PatientEntity : BaseEntity
    {
        public Guid UserId {get;set;}
        public DateTime BirthdayDate { get; set; }
        public string Phone {get;set;}
    }
}