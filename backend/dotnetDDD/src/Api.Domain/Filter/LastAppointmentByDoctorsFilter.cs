using System;
using System.ComponentModel.DataAnnotations;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Filter
{
    public class LastAppointmentByDoctorsFilter
    {
        public string? Specialty {get;set;}
        public DateTime? Date {get;set;}
    }
}