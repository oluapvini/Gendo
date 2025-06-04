namespace Api.Domain.Dto.Doctor
{
    public class DoctorPostDto
    {
        public string CRM { get; set; }
        public string Specialty { get; set; }
        public AddressDto Address { get; set; }
    }
}