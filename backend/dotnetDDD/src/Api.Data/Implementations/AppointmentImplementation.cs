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

namespace Api.Data.Implementations
{
    public class AppointmentImplementation : BaseRepository<AppointmentEntity>, IAppointmentRepository
    {
        private DbSet<AppointmentEntity> _dataset;
        private DbSet<DoctorEntity> _doctorDataset;

        public AppointmentImplementation(MyContext context) : base(context)
        {
            _dataset = context.Set<AppointmentEntity>();
            _doctorDataset = context.Set<DoctorEntity>();
        }

        public async Task<List<LastAppointmentByDoctorsDto>> GetLastAppointmentByDoctors (LastAppointmentByDoctorsFilter filter) {
            var result = await _doctorDataset 
                .Where(d => filter.Specialty == null || d.Specialty == filter.Specialty)
                .Select(d => new LastAppointmentByDoctorsDto {
                    Doctor = new DoctorResultAppointmentDto {
                        CRM = d.CRM,
                        Specialty = d.Specialty,
                        Name = d.User.Nome
                    },
                    LastAppointment =  d.Appointments
                        .OrderBy(a => a.DateTime)
                        .Select(a => new AppointmentResultDto {
                            Id = a.Id,
                            Status = a.Status,
                            DateTime = a.DateTime
                        })
                        .LastOrDefault()
                })
                .Where(ld => filter.Date == null || ld.LastAppointment.DateTime == filter.Date)
                .ToListAsync();

            return result;
        }

        public async Task<List<AppointmentResultDto>> GetAllByFilter (AppointmentFilter filter) {
            var result = await _dataset
                .Where(a => filter.DoctorId == null || a.DoctorId == filter.DoctorId)
                .Select(a => new AppointmentResultDto {
                    DateTime = a.DateTime,
                    Status = a.Status
                })
                .ToListAsync();

            return result;
        }
    }
}