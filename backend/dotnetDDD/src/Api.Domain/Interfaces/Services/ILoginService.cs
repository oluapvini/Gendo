using System.Threading.Tasks;
using Api.Domain.Dto.Login;

namespace Api.Domain.Interfaces.Services
{
    public interface ILoginService
    {
        Task<object> FindByLogin(LoginDto user);
        Task<bool> ResetPassword(ResetPasswordDto resetPasswordDto);
        Task<bool> ValidateResetToken(TokenValidationDto tokenValidationDto);
        Task<bool> SetNewPassword(NewPasswordDto newPasswordDto);
    }
}