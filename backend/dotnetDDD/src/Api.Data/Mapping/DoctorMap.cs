using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Mapping
{
       public class DoctorMap : IEntityTypeConfiguration<DoctorEntity>
       {

              public void Configure(EntityTypeBuilder<DoctorEntity> builder)
              {

                     builder.ToTable("Doctor");

                     builder.HasKey(u => u.Id);
              }
       }
}