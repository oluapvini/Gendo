using System;
using System.ComponentModel.DataAnnotations;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Filter
{
    public class DoctorFilter
    {
        public string? Specialty {get;set;}
        public string? State {get;set;}
        public string? City {get;set;}
    }
}