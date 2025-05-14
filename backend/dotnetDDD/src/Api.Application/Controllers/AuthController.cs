using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Api.Domain.Dto.Login;
using Api.Domain.Entities;
using Api.Domain.Interfaces.Services;
using Api.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("login", Name = "Login")]
        public async Task<object> Login([FromBody] LoginDto user, [FromServices] ILoginService service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (user == null)
            {
                return BadRequest();
            }

            try
            {
                var result = await service.FindByLogin(user);

                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }

            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("reset-password", Name = "ResetPassword")]
        public async Task<ActionResult> EsqueciMinhaSenha([FromBody] ResetPasswordDto resetPasswordDto, [FromServices] ILoginService service)
        {
            if (!ModelState.IsValid || resetPasswordDto == null)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await service.ResetPassword(resetPasswordDto);

                if (result != null)
                {
                    return Ok("Token enviado para o e-mail informado.");
                }
                else
                {
                    return NotFound("Usuário não encontrado.");
                }
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        
        [AllowAnonymous]
        [HttpPost]
        [Route("validate-token", Name = "ValidateTokenRequestNewPassword")]
        public async Task<ActionResult> ValidarTokenNovaSenha([FromBody] TokenValidationDto tokenValidationDto, [FromServices] ILoginService service)
        {
            if (!ModelState.IsValid || tokenValidationDto == null)
            {
                return BadRequest(ModelState);
            }

            try
            {
                bool isValid = await service.ValidateResetToken(tokenValidationDto);

                if (isValid)
                {
                    return Ok("Token válido.");
                }
                else
                {
                    return BadRequest("Token inválido ou expirado.");
                }
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
        
        
        [AllowAnonymous]
        [HttpPost]
        [Route("set-new-password", Name = "DefineNewPassword")]
        public async Task<ActionResult> DefinirNovaSenha([FromBody] NewPasswordDto newPasswordDto, [FromServices] ILoginService service)
        {
            if (!ModelState.IsValid || newPasswordDto == null)
            {
                return BadRequest(ModelState);
            }

            try
            {
                bool success = await service.SetNewPassword(newPasswordDto);

                if (success)
                {
                    return Ok("Senha redefinida com sucesso.");
                }
                else
                {
                    return BadRequest("Falha ao redefinir a senha. Verifique se o token é válido e tente novamente.");
                }
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
