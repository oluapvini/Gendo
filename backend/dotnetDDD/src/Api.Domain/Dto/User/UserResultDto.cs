using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto.Setor;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Dto
{
    public class UserResultDto
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public UserTypeEnum Type {get;set;} = UserTypeEnum.Patient;
    }
}