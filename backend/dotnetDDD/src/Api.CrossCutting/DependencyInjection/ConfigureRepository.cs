using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data.Context;
using Api.Data.Implementations;
using Api.Data.Repository;
using Api.Domain.Interfaces;
using Api.Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Api.CrossCutting.DependencyInjection
{
    public class ConfigureRepository
    {
        public static void ConfigureDependenciesRepository(IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
            serviceCollection.AddScoped<IUserRepository, UserImplementation>();
            serviceCollection.AddScoped<IAppointmentRepository, AppointmentImplementation>();

            serviceCollection.AddDbContext<MyContext>(
                options => options.UseNpgsql("Server=localhost;Port=5433;Database=PJSDATABASE;User Id=admin;Password=1234")
            );

            //Conexão Rayan          
            //serviceCollection.AddDbContext<MyContext>(
            //    options => options.UseNpgsql("Server=localhost;Port=5432;Database=ADS;UserId=postgres;Password=12345")
            //);  

        }
    }
}