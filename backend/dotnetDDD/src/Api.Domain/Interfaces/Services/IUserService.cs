using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto;
using Api.Domain.Dto.Setor;
using Api.Domain.Dto.User;
using Api.Domain.Entities;

namespace Api.Domain.Interfaces.Services
{
    public interface IUserService
    {
        Task<UserResultDto> Get(Guid id);
        Task<IEnumerable<UserResultDto>> GetAll();
        Task<UserResultDto> Post(UserPostDto user);
        Task<UserResultDto> Put(UserPutDto user);
        Task<bool> Delete(Guid id);
    
    }
}