using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data.Context;
using Api.Data.Repository;
using Api.Domain.Dto;
using Api.Domain.Dto.Appointment;
using Api.Domain.Dto.Doctor;
using Api.Domain.Entities;
using Api.Domain.Filter;
using Api.Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Api.Data.Implementations
{
    public class DoctorImplementation : BaseRepository<DoctorEntity>, IDoctorRepository
    {
        private DbSet<DoctorEntity> _dataset;

        public DoctorImplementation(MyContext context) : base(context)
        {
            _dataset = context.Set<DoctorEntity>();
        }

        public async Task<List<string>> GetDoctorsSpecialty()
        {
            return await _dataset.Select(d => d.Specialty).Distinct().ToListAsync();
        }
        public async Task<List<string>> GetDoctorsState()
        {
            return await _dataset.Select(d => d.Address.State).Distinct().ToListAsync();
        }
        public async Task<List<string>> GetDoctorCitiesByState(string state)
        {
            return await _dataset.Select(d => d.Address).Where(a => a.State == state).Select(a => a.City).Distinct().ToListAsync();
        }
        public async Task<IEnumerable<DoctorResultDto>> GetAllByFilter(DoctorFilter filter)
        {
            List<DoctorResultDto> doctors = await _dataset
                 .Where(d =>
                     (filter.City == null || (d.Address != null && filter.City == d.Address.City)) &&
                     (filter.Specialty == null || filter.Specialty == d.Specialty) &&
                     (filter.State == null || (d.Address != null && filter.State == d.Address.State))
                 )
                 .Select(d => new DoctorResultDto
                 {
                     Address = d.Address,
                     CRM = d.CRM,
                     Id = d.Id,
                     Name = d.User.Nome,
                     Appointments = d.Appointments,
                     ServiceType = d.ServiceType,
                     Specialty = d.Specialty
                 }).ToListAsync();

            // Processa o Schedule em memória (após o ToListAsync)
            foreach (var doctor in doctors)
            {
                doctor.Schedule = doctor.Appointments?
                    .GroupBy(a => a.DateTime.Date)
                    .Select(a => new ScheduleDto
                    {
                        Label = a.Key.ToString("yyyy-MM-dd"),
                        Values = a.Select(a => a.DateTime.ToString("HH:mm")).ToList()
                    }).ToList() ?? new List<ScheduleDto>();

                doctor.Appointments = null;
            }



            return doctors;
        }

        public async Task<DoctorResultDto> Get(Guid id)
        {
            DoctorResultDto doctor = await _dataset
                 .Where(d => d.Id == id)
                 .Select(d => new DoctorResultDto
                 {
                     Address = d.Address,
                     CRM = d.CRM,
                     Id = d.Id,
                     Name = d.User.Nome,
                     Appointments = d.Appointments,
                     ServiceType = d.ServiceType,
                     Specialty = d.Specialty
                 }).FirstOrDefaultAsync();

            doctor.Schedule = doctor.Appointments?
                .GroupBy(a => a.DateTime.Date)
                .Select(a => new ScheduleDto
                {
                    Label = a.Key.ToString("yyyy-MM-dd"),
                    Values = a.Select(a => a.DateTime.ToString("HH:mm")).ToList()
                }).ToList() ?? new List<ScheduleDto>();

            doctor.Appointments = null;

            return doctor;
        }
    }
}