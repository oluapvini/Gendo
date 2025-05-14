using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto;
using Api.Domain.Dto.Setor;
using Api.Domain.Dto.User;
using Api.Domain.Entities;
using AutoMapper;

namespace Api.CrossCutting.Mappings
{
    public class EntityToDtoProfile : Profile
    {
        public EntityToDtoProfile()
        {
            CreateMap<UserResultDto,UserEntity>()
                .ReverseMap();

            CreateMap<UserPostDto, UserEntity>()
                .ReverseMap();

            CreateMap<UserPutDto,UserEntity>()
                .ReverseMap();
        }
    }
}