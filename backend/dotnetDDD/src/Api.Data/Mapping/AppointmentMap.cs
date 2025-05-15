using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Mapping
{
       public class AppointmentMap : IEntityTypeConfiguration<AppointmentEntity>
       {

              public void Configure(EntityTypeBuilder<AppointmentEntity> builder)
              {

                     builder.ToTable("Appointment");

                     builder.HasKey(u => u.Id);
              }
       }
}