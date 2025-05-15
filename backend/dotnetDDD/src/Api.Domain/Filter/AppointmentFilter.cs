using System;
using System.ComponentModel.DataAnnotations;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Filter
{
    public class AppointmentFilter
    {
        public Guid? DoctorId {get;set;}
    }
}