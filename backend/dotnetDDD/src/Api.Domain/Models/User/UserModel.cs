using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Models.User
{
    public class UserModel
    {
        private Guid _id;
        public Guid Id
        {
            get { return _id; }
            set { _id = value; }
        }

        private string _nome;

        public string Nome
        {
            get { return _nome; }
            set { _nome = value; }
        }

        private string _email;

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }

        // Propriedade privada para armazenar o hash da senha
        private string _passwordHash;
        public string PasswordHash
        {
            get { return _passwordHash; }
            private set { _passwordHash = value; }
        }

        private string? _passwordResetToken;
        public string? PasswordResetToken
        {
            get { return _passwordResetToken; }
            set { _passwordResetToken = value; }
        }

        private DateTime? _passwordResetTokenExpiration;
        public DateTime? PasswordResetTokenExpiration
        {
            get { return _passwordResetTokenExpiration; }
            set { _passwordResetTokenExpiration = value; }
        }


        // Método para definir a senha e criar o hash
        public void SetPassword(string password)
        {
            // Gera o hash da senha usando BCrypt
            _passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
        }

    }
}