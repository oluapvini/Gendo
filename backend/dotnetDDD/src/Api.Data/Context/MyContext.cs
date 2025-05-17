using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data.Mapping;
using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Context
{
    public class MyContext : DbContext
    {
        public DbSet<AppointmentEntity> Appointment { get; set; }
        public DbSet<DoctorEntity> Doctor { get; set; }
        public DbSet<AddressEntity> Address { get; set; }
        public DbSet<PatientEntity> Patient { get; set; }
        public DbSet<UserEntity> User { get; set; }

        public MyContext (DbContextOptions<MyContext> options) : base (options) {}
    
        protected override void OnModelCreating (ModelBuilder modelBuilder){
            base.OnModelCreating (modelBuilder);
            modelBuilder.Entity<AppointmentEntity> (new AppointmentMap().Configure);
            modelBuilder.Entity<AddressEntity> (new AddressMap().Configure);
            modelBuilder.Entity<DoctorEntity> (new DoctorMap().Configure);
            modelBuilder.Entity<PatientEntity> (new PatientMap().Configure);
            modelBuilder.Entity<UserEntity> (new UserMap().Configure);
        }
    }
}