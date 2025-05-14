using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto;
using Api.Domain.Dto.Setor;
using Api.Domain.Dto.User;
using Api.Domain.Models.User;
using AutoMapper;

namespace Api.CrossCutting.Mappings
{
    public class DtoToModelProfile : Profile
    {
        public DtoToModelProfile()
        {
            CreateMap<UserModel,UserResultDto>()
                .ReverseMap();
            CreateMap<UserModel,UserPostDto>()
                .ReverseMap();
            CreateMap<UserModel,UserPutDto>()
                .ReverseMap();
        }
    }
}