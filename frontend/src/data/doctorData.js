export const doctors = [
  {
    id: 1,
    name: "Dr. Thomas Turbelin",
    specialty: "Dermatologista",
    image: "/",
    address: {
      street: "Rua Conde de Bonfim, 112 - Tijuca",
      city: "Rio de Janeiro",
      state: "RJ"
    },
    serviceType: "Consulta dermatológica",
    rating: 4.8,
    schedule: {
      "02/06": ["09:00", "10:30"],
      "03/06": ["08:00", "09:00", "11:00"]
    }
  },
];

export const specialties = [
  { value: "all", label: "Todas as especialidades" },
  { value: "Dermatologia", label: "Dermatologista" },
  { value: "cardiologista", label: "Cardiologista" },
  { value: "ortopedista", label: "Ortopedista" },
  { value: "oftalmologista", label: "Oftalmologista" },
  { value: "neurologista", label: "Neurologista"},
];
