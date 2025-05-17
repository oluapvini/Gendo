using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto;
using Api.Domain.Dto.Setor;
using Api.Domain.Dto.Appointment;
using Api.Domain.Entities;
using Api.Domain.Interfaces;
using Api.Domain.Interfaces.Services;
using Npgsql.TypeMapping;
using AutoMapper;
using BCrypt.Net;
using Api.Domain.Interfaces.Repository;
using Api.Domain.Filter;
using Api.Domain.Dto.Doctor;

namespace Api.Service.Services
{
    public class DoctorService : IDoctorService
    {

        private IDoctorRepository _repository;
        private readonly IMapper _mapper;

        public DoctorService(IDoctorRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<bool> Delete(Guid id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<DoctorResultDto> Get(Guid id)
        {
            return await _repository.Get(id);
        }

        public async Task<IEnumerable<DoctorResultDto>> GetAll(DoctorFilter filter)
        {
            return await _repository.GetAllByFilter(filter);
        }

        public async Task<List<string>> GetSpecialties()
        {
            return await _repository.GetDoctorsSpecialty();
        }

        public async Task<List<string>> GetStates()
        {
            return await _repository.GetDoctorsState();
        }

        public async Task<List<string>> GetCitiesByState(string state)
        {
            return await _repository.GetDoctorCitiesByState(state);
        }

        public async Task<DoctorEntity> Post(DoctorEntity doctor)
        {
            var result = await _repository.InsertAsync(doctor);

            return result;
        }

        public async Task<DoctorEntity> Put(DoctorEntity doctor)
        {
            var result = await _repository.UpdateAsync(doctor);

            return result;
        }
    }
}