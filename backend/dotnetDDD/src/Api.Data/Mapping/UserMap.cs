using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Mapping
{
       public class UserMap : IEntityTypeConfiguration<UserEntity>
       {

              public void Configure(EntityTypeBuilder<UserEntity> builder)
              {

                     builder.ToTable("User");

                     builder.HasKey(u => u.Id);

                     builder.HasIndex(u => u.Email)
                            .IsUnique();

                     builder.Property(u => u.Nome)
                            .IsRequired()
                            .HasMaxLength(60);

                     builder.Property(u => u.PasswordResetToken)
                            .HasMaxLength(5);

                     builder.Property(u => u.Email)
                            .HasMaxLength(100);

                     builder.Property(u => u.PasswordHash)
                         .IsRequired();
                     
                     builder.Property(u => u.PasswordResetTokenExpiration);
              }
       }
}