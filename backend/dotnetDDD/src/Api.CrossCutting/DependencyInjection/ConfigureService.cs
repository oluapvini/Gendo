using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Interfaces.Services;
using Api.Service.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Api.CrossCutting.DependencyInjection
{
    public class ConfigureService
    {
        public static void ConfigureDependenciesService (IServiceCollection serviceCollection){
            serviceCollection.AddTransient<IUserService,UserService>();
            serviceCollection.AddTransient<IMailSenderService,MailSenderService>();
            serviceCollection.AddTransient<ILoginService,LoginService>();
            serviceCollection.AddTransient<IAppointmentService,AppointmentService>();
            serviceCollection.AddTransient<IDoctorService,DoctorService>();
        }
    }
}