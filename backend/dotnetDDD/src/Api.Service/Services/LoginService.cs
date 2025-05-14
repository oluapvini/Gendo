using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Api.Domain.Dto.Login;
using Api.Domain.Entities;
using Api.Domain.Interfaces.Repository;
using Api.Domain.Interfaces.Services;
using Api.Domain.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RTools_NTS.Util;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MailKit;
using Api.Domain.Models.User;
using AutoMapper;
using Api.Domain.Dto.User;
using Api.Domain.Dto;

namespace Api.Service.Services
{
    public class LoginService : ILoginService
    {

        private IUserRepository _repository;
        private readonly IMailSenderService _mailSenderService;
        private readonly IUserService _userService;
        private SigningConfigurations _signingConfigurations;
        private TokenConfigurations _tokenConfigurations;
        private IConfiguration _configuration;
        private readonly IMapper _mapper;


        public LoginService(IUserRepository repository, IMailSenderService mailSenderService,IUserService userService, SigningConfigurations signingConfigurations, TokenConfigurations tokenConfigurations, IConfiguration configuration,IMapper mapper)
        {
            _repository = repository;
            _mailSenderService = mailSenderService;
            _userService = userService;
            _signingConfigurations = signingConfigurations;
            _tokenConfigurations = tokenConfigurations;
            _configuration = configuration;
            _mapper = mapper;
        }
        public async Task<object> FindByLogin(LoginDto user)
        {

            var baseUser = new UserEntity();

            if (user != null)
            {


                baseUser = await _repository.FindByEmail(user.Usuario)
                        ?? await _repository.FindByUserName(user.Usuario);

                if (baseUser == null)
                {
                    return new
                    {
                        authenticated = false,
                        message = "Falha ao autenticar"
                    };
                }

                if (!VerifyPassword(user.Password, baseUser.PasswordHash))
                {
                    return new
                    {
                        authenticated = false,
                        message = "Usuário ou senha inválidos"
                    };
                }
                else
                {
                    ClaimsIdentity identity = new ClaimsIdentity(
                        new GenericIdentity(user.Usuario),
                        new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName,user.Usuario)
                        }
                    );

                    DateTime createDate = DateTime.Now;
                    DateTime expirationDate = createDate + TimeSpan.FromSeconds(_tokenConfigurations.Seconds);

                    var handler = new JwtSecurityTokenHandler();
                    string token = CreateToken(identity, createDate, expirationDate, handler);

                    return SuccessObject(createDate, expirationDate, token, user);
                }

            }
            else
            {
                return new
                {
                    authenticated = false,
                    message = "Falha ao autenticar"
                };
            }
        }

        private bool VerifyPassword(string passwordRequest, string hashedPassword)
        {
            // Verifica se a senha fornecida corresponde ao hash armazenado
            return BCrypt.Net.BCrypt.Verify(passwordRequest, hashedPassword);
        }

        private object SuccessObject(DateTime createDate, DateTime expirationDate, string token, LoginDto user)
        {
            return new
            {
                authenticated = true,
                created = createDate.ToString("yyyy-MM-dd HH:mm:ss"),
                expiration = expirationDate.ToString("yyyy-MM-dd HH:mm:ss"),
                acessToken = token,
                userName = user.Usuario,
                message = "Usuário Logado com sucesso"
            };
        }

        private string CreateToken(ClaimsIdentity identity, DateTime createDate, DateTime expirationDate, JwtSecurityTokenHandler handler)
        {

            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {

                Issuer = _tokenConfigurations.Issuer,
                Audience = _tokenConfigurations.Audience,
                SigningCredentials = _signingConfigurations.SigningCredentials,
                Subject = identity,
                NotBefore = createDate,
                Expires = expirationDate,
            });

            var token = handler.WriteToken(securityToken);
            return token;
        }

        public async Task<bool> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var user = await _repository.FindByEmail(resetPasswordDto.Usuario)
                       ?? await _repository.FindByUserName(resetPasswordDto.Usuario);

            if (user == null)
            {
                throw new ArgumentException("Usuário não encontrado!");
            }

            try
            {

                var random = new Random();
                int token = random.Next(10000, 99999);

                user.PasswordResetToken = token.ToString();
                user.PasswordResetTokenExpiration = DateTime.UtcNow.AddMinutes(2);

                await _repository.UpdateAsync(user);

                await _mailSenderService.SendEmailService(user.Email, user.Id, token.ToString());

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Falha ao enviar token de recuperação de senha. " + ex.Message, ex);
            }
        }

        public async Task<bool> ValidateResetToken(TokenValidationDto tokenValidationDto)
        {
            UserEntity user = await _repository.SelectAsync(tokenValidationDto.UserId);

            if (user == null)
            {
                throw new ArgumentException("Usuário não encontrado!");
            }

            try
            {
                if (user.PasswordResetToken == tokenValidationDto.Token)
                {
                    // Verifica se o token ainda não expirou
                    if (user.PasswordResetTokenExpiration > DateTime.UtcNow)
                    {
                        return true; // Token válido
                    }
                    else
                    {
                        throw new ArgumentException("Token expirado!");
                    }
                }
                else
                {
                    throw new ArgumentException("Token inválido!");
                }
            }
            catch (ArgumentException e)
            {
                // Lançando exceção com a mensagem de erro apropriada
                throw new ArgumentException("Falha ao validar o token: " + e.Message);
            }

        }

        public async Task<bool> SetNewPassword(NewPasswordDto newPasswordDto)
        {
            UserEntity user = await _repository.SelectAsync(newPasswordDto.UserId);

            if(user.PasswordResetToken != newPasswordDto.PasswordResetToken) {
                throw new ArgumentException("Token não encontrado!");
            }

            if(user.PasswordResetTokenExpiration < DateTime.Now) {
                throw new ArgumentException("Token expirado!");
            }

            if (user == null)
            {
                throw new ArgumentException("Usuário não encontrado!");
            }

            UserModel userModel = _mapper.Map<UserModel>(user);

            userModel.SetPassword(newPasswordDto.NewPassword);

            userModel.PasswordResetToken = null;
            userModel.PasswordResetTokenExpiration = null;

            UserPutDto userPutDto = _mapper.Map<UserPutDto>(userModel);

            UserResultDto result = await _userService.Put(userPutDto);

            if(result == null){
                throw new InvalidOperationException("Erro ao atualizar a senha!");
            }

            return true;
        }
    }
}