using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        public Guid Id  { get; set; }
        private DateTime? _dataCriacao;
        public DateTime? DataCriacao{
            get { return _dataCriacao; }
            set { _dataCriacao = (value == null ? DateTime.UtcNow : value);}
        }
        public DateTime? DataAtualizacao { get; set; }
    }
}