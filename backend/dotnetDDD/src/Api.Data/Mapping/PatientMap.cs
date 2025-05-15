using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Mapping
{
       public class PatientMap : IEntityTypeConfiguration<PatientEntity>
       {

              public void Configure(EntityTypeBuilder<PatientEntity> builder)
              {

                     builder.ToTable("Patient");

                     builder.HasKey(u => u.Id);
              }
       }
}