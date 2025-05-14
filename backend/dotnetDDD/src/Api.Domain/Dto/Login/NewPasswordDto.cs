using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Dto.Login
{
    public class NewPasswordDto
    {
        public string PasswordResetToken {get;set;}
        public string NewPassword {get;set;}
        public Guid UserId {get;set;}
    }
}