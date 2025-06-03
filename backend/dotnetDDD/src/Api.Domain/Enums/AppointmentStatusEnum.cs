// Domain/Enums/StatusConsulta.cs
namespace Api.Domain.Entities.Enums
{
    public enum AppointmentStatusEnum
    {
        Pending = 1, //Pendente
        Confirming = 2, //A Confirmar
        Scheduled = 3, //Agendada
        Completed = 4, //Realizada
        Canceled = 5 // Cancelada
    }
}
