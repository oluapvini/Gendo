using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain.Dto.Appointment;
using Api.Domain.Filter;

namespace Api.Domain.Interfaces.Services
{
    public interface IAppointmentService
    {
        Task<AppointmentResultDto> Get(Guid id);
        Task<IEnumerable<AppointmentResultDto>> GetAll(AppointmentFilter filter);
        Task<List<LastAppointmentByDoctorsDto>> GetLastAppointmentByDoctors (LastAppointmentByDoctorsFilter filter);
        Task<AppointmentResultDto> Post(AppointmentPostDto appointment);
        Task<AppointmentResultDto> Put(AppointmentPutDto appointment);
        Task<bool> Delete(Guid id);
    
    }
}