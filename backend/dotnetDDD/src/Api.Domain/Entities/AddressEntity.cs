using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Api.Domain.Entities
{
    public class AddressEntity : BaseEntity
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}