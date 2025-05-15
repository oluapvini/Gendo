using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Dto.Patient
{
    public class PatientPostDto
    {
        public DateTime BirthdayDate { get; set; }
        public string Phone {get;set;}
    }
}