using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto.Login;
using Api.Domain.Dto.Setor;

namespace Api.Domain.Interfaces.Services
{
    public interface IMailSenderService
    {
        Task SendEmailService(string email, Guid userId, string PasswordResetToken);
    }
}