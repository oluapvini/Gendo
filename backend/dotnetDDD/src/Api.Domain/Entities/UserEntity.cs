using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Entities.Enums;

namespace Api.Domain.Entities
{
    public class UserEntity : BaseEntity
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public UserTypeEnum Type {get;set;}
        public string PasswordHash {get;set;}
        public string? PasswordResetToken {get;set;}
        public DateTime? PasswordResetTokenExpiration {get;set;} 
    }
}