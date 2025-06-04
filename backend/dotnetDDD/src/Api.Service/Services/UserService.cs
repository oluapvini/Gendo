using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto;
using Api.Domain.Dto.Setor;
using Api.Domain.Dto.User;
using Api.Domain.Entities;
using Api.Domain.Interfaces;
using Api.Domain.Interfaces.Services;
using Npgsql.TypeMapping;
using AutoMapper;
using Api.Domain.Models.User;
using BCrypt.Net;
using Api.Domain.Interfaces.Repository;
using Api.Domain.Entities.Enums;

namespace Api.Service.Services
{
    public class UserService : IUserService
    {

        private IUserRepository _repository;
        private IRepository<DoctorEntity> _doctorRepository;
        private IRepository<PatientEntity> _patientRepository;
        private readonly IMapper _mapper;

        public UserService(
            IUserRepository repository, 
            IRepository<DoctorEntity> doctorRepository, 
            IRepository<PatientEntity> patientRepository, 
            IMapper mapper
        ) {
            _repository = repository;
            _doctorRepository = doctorRepository;
            _patientRepository = patientRepository;
            _mapper = mapper;
        }

        public async Task<bool> Delete(Guid id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<UserResultDto> Get(Guid id)
        {
            UserEntity entity = await _repository.SelectAsync(id);

            return _mapper.Map<UserResultDto>(entity);
        }

        public async Task<IEnumerable<UserResultDto>> GetAll()
        {
            var listEntity = await _repository.SelectAsync();

            var dto = _mapper.Map<IEnumerable<UserResultDto>>(listEntity);

            return dto;
        }

        public async Task<UserResultDto> Post(UserPostDto user)
        {

            var findEmail = await _repository.FindByEmail(user.Email);

            if (findEmail != null)
            {
                throw new InvalidOperationException("Este e-mail já está em uso.");
            }

            var findUserName = await _repository.FindByUserName(user.Nome); 
           
            if (findUserName != null)
            {
                throw new InvalidOperationException("Este nome de usuário já está em uso.");
            }

            var model = _mapper.Map<UserModel>(user);

            model.SetPassword(user.Password);

            var entity = _mapper.Map<UserEntity>(model);

            var result = await _repository.InsertAsync(entity);

            if(user.Type == UserTypeEnum.Doctor) {
                DoctorEntity newDoctor = new DoctorEntity
                {
                    CRM = user.Doctor.CRM,
                    Specialty = user.Doctor.Specialty,
                    UserId = result.Id,
                    Address = _mapper.Map<AddressEntity>(user.Doctor.Address)
                };

                await _doctorRepository.InsertAsync(newDoctor);
            }

            if(user.Type == UserTypeEnum.Patient) {
                PatientEntity newDoctor = new PatientEntity {
                    BirthdayDate = user.Patient.BirthdayDate,
                    Phone = user.Patient.Phone,
                    UserId = result.Id,
                };

                await _patientRepository.InsertAsync(newDoctor);
            }

            return _mapper.Map<UserResultDto>(result);
        }

        public async Task<UserResultDto> Put(UserPutDto user)
        {
            var model = _mapper.Map<UserModel>(user);

            var entity = _mapper.Map<UserEntity>(model);

            var result = await _repository.UpdateAsync(entity);

            return _mapper.Map<UserResultDto>(result);
        }
    }
}