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
using Api.Domain.Entities.Enums;

namespace Api.Service.Services
{
    public class AppointmentService : IAppointmentService
    {

        private IAppointmentRepository _repository;
        private readonly IMapper _mapper;

        public AppointmentService(IAppointmentRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<AppointmentResultDto> Delete(Guid id)
        {
            AppointmentEntity entity = await _repository.SelectAsync(id);

            entity.Status = AppointmentStatusEnum.Canceled;

            AppointmentEntity result = await _repository.UpdateAsync(entity);

            return _mapper.Map<AppointmentResultDto>(result);
        }

        public async Task<AppointmentResultDto> Get(Guid id)
        {
            AppointmentEntity entity = await _repository.SelectAsync(id);

            return _mapper.Map<AppointmentResultDto>(entity);
        }

        public async Task<IEnumerable<AppointmentResultDto>> GetAll(AppointmentFilter filter)
        {
            return await _repository.GetAllByFilter(filter);
        }

        public async Task<List<LastAppointmentByDoctorsDto>> GetLastAppointmentByDoctors (LastAppointmentByDoctorsFilter filter) {
            return await _repository.GetLastAppointmentByDoctors(filter);
        }

        public async Task<AppointmentResultDto> Post(AppointmentPostDto appointment)
        {
            var entity = _mapper.Map<AppointmentEntity>(appointment);

            var result = await _repository.InsertAsync(entity);

            return _mapper.Map<AppointmentResultDto>(result);
        }

        public async Task<AppointmentResultDto> Put(AppointmentPutDto appointment)
        {
            var entity = _mapper.Map<AppointmentEntity>(appointment);

            var result = await _repository.UpdateAsync(entity);

            return _mapper.Map<AppointmentResultDto>(result);
        }
    }
}