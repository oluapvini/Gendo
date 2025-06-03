using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto;
using Api.Domain.Dto.Appointment;
using Api.Domain.Entities;
using Api.Domain.Filter;

namespace Api.Domain.Interfaces.Repository
{
    public interface IAppointmentRepository : IRepository<AppointmentEntity>
    {
        Task<List<LastAppointmentByDoctorsDto>> GetLastAppointmentByDoctors (LastAppointmentByDoctorsFilter filter);
        Task<List<AppointmentResultDto>> GetAllByFilter (AppointmentFilter filter);
        Task<AppointmentEntity> GetByDateTime (DateTime dateTime);
    }
}