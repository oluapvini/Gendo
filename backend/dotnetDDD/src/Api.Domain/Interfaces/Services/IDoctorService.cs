using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain.Dto.Appointment;
using Api.Domain.Dto.Doctor;
using Api.Domain.Entities;
using Api.Domain.Filter;

namespace Api.Domain.Interfaces.Services
{
    public interface IDoctorService
    {
        Task<DoctorResultDto> Get(Guid id);
        Task<IEnumerable<DoctorResultDto>> GetAll(DoctorFilter doctorFilter);
        Task<List<string>> GetSpecialties();
        Task<List<string>> GetStates();
        Task<List<string>> GetCitiesByState(string state);
        Task<DoctorEntity> Post(DoctorEntity doctor);
        Task<DoctorEntity> Put(DoctorEntity doctor);
        Task<bool> Delete(Guid id);
    
    }
}