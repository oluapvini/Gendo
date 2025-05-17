using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto;
using Api.Domain.Dto.Appointment;
using Api.Domain.Dto.Doctor;
using Api.Domain.Entities;
using Api.Domain.Filter;

namespace Api.Domain.Interfaces.Repository
{
    public interface IDoctorRepository : IRepository<DoctorEntity>
    {
        Task<List<string>> GetDoctorsSpecialty();
        Task<List<string>> GetDoctorsState();
        Task<List<string>> GetDoctorCitiesByState(string state);
        Task<IEnumerable<DoctorResultDto>> GetAllByFilter(DoctorFilter filter);
        Task<DoctorResultDto> Get(Guid id);
    }
}