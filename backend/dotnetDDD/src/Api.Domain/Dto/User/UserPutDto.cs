using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Dto.User
{
    public class UserPutDto
    {
        [Required(ErrorMessage = "ID do usuário é necessário para a atualização")]
        public Guid Id {get;set;}

        [Required(ErrorMessage = "Nome é campo obrigatório!")]
        [StringLength(60, ErrorMessage = "Nome deve ter no máximo {1} caracteres")]
        public string Nome { get; set; }
        
        [Required(ErrorMessage = "Email é um campo obrigatório")]
        [EmailAddress(ErrorMessage = "Email em formato inválido")]
        [StringLength(100,ErrorMessage = "Email deve ter no máximo {1} caracteres")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Senha é um campo obrigatório")]
        [StringLength(80, ErrorMessage = "Senha deve ter no máximo {1} caracteres")]
        public string Password {get;set;}
        public string? PasswordHash {get;set;}
    }
}