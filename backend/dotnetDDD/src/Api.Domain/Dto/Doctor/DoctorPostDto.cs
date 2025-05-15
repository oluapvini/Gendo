using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Dto.Doctor
{
    public class DoctorPostDto
    {
        public string CRM { get; set; }
        public string Specialty {get;set;}
    }
}