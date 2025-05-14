using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto.Setor;

namespace Api.Domain.Dto.Login
{
    public class TokenValidationDto
    {
        public string Token {get;set;}
        public Guid UserId {get;set;}
    }
}