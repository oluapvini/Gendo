// Dados simulados para os médicos
export const doctors = [
  {
    id: 1,
    name: "Dr. Thomas Turbelin",
    specialty: "Dermatologista",
    image: "/placeholder-doctor.png",
    address: "Rua Conde de Bonfim, 112 - Tijuca",
    serviceType: "Consulta dermatológica",
    rating: 4.8
  },
  {
    id: 2,
    name: "Dra. Ana Beatriz Costa",
    specialty: "Cardiologista",
    image: "/placeholder-doctor-female.png",
    address: "Av. das Américas, 500 - Barra da Tijuca",
    serviceType: "Consulta cardiológica",
    rating: 4.9
  },
  {
    id: 3,
    name: "Dr. Roberto Menezes",
    specialty: "Ortopedista",
    image: "/placeholder-doctor.png",
    address: "Rua Visconde de Pirajá, 351 - Ipanema",
    serviceType: "Consulta ortopédica",
    rating: 4.7
  }
];

// Especialidades médicas disponíveis
export const specialties = [
  { value: "all", label: "Todas as especialidades" },
  { value: "dermatologista", label: "Dermatologista" },
  { value: "cardiologista", label: "Cardiologista" },
  { value: "ortopedista", label: "Ortopedista" },
  { value: "oftalmologista", label: "Oftalmologista" },
  { value: "neurologista", label: "Neurologista" },
];

// Dados do usuário logado
export const userData = {
  name: "Meu Nome da Silva",
  email: "momepessoa15@gmail.com",
  type: "Paciente",
  image: "/placeholder-user.png",
  address: {
    cep: "22730-340",
    city: "Rio de Janeiro",
    state: "RJ",
    street: "Rua General Almada, 2034"
  }
};
