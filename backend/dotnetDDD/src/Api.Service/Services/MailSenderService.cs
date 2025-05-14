using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Dto.Setor;
using Api.Domain.Interfaces.Services;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace Api.Service.Services
{
    public class MailSenderService : IMailSenderService
{
    private readonly IConfiguration _configuration;

    public MailSenderService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailService(string email, Guid userId, string passwordResetToken)
    {
        var message = new MimeMessage();

        message.From.Add(new MailboxAddress("Equipe Multiplica", _configuration["SmtpSettings:Username"]));
        message.To.Add(new MailboxAddress("", email));
        message.Subject = "Envio de token para recuperação de senha";
        message.Body = new TextPart("plain")
        {
            Text = $"Token para resetar a sua senha: {passwordResetToken} \nRecupere sua senha através do link: http://localhost:3000/recuperacao-token/{userId}"
        };

        using (var client = new SmtpClient())
        {
            await client.ConnectAsync(_configuration["SmtpSettings:Host"], int.Parse(_configuration["SmtpSettings:Port"]), MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_configuration["SmtpSettings:Username"], _configuration["SmtpSettings:Password"]);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}
}