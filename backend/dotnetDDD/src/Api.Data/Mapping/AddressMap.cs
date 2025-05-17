using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Mapping
{
       public class AddressMap : IEntityTypeConfiguration<AddressEntity>
       {

              public void Configure(EntityTypeBuilder<AddressEntity> builder)
              {

                     builder.ToTable("Address");

                     builder.HasKey(u => u.Id);
              }
       }
}