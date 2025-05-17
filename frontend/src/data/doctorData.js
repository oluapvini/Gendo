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
      "15/05": ["09:00", "10:30"],
      "16/05": ["08:00", "09:00", "11:00"]
    }
  },
  {
    id: 2,
    name: "Dra. Ana Beatriz Costa",
    specialty: "Cardiologista",
    image: "/",
    address: {
      street: "Av. das Américas, 500 - Barra da Tijuca",
      city: "Rio de Janeiro",
      state: "RJ"
    },
    serviceType: "Consulta cardiológica",
    rating: 4.9,
    schedule: {
      "15/05": ["07:00", "08:30"],
      "17/05": ["10:00", "11:30"]
    }
  },
  {
    id: 3,
    name: "Dr. Roberto Menezes",
    specialty: "Ortopedista",
    image: "/",
    address: {
      street: "Rua Visconde de Pirajá, 351 - Ipanema",
      city: "Rio de Janeiro",
      state: "RJ"
    },
    serviceType: "Consulta ortopédica",
    rating: 4.7,
    schedule: {
      "16/05": ["09:30", "10:30"],
      "18/05": ["14:00", "15:00"]
    }
  },
  {
    id: 4,
    name: "Dra. Juliana Souza",
    specialty: "Oftalmologista",
    image: "/",
    address: {
      street: "Av. Paulista, 1500 - Bela Vista",
      city: "São Paulo",
      state: "SP"
    },
    serviceType: "Consulta oftalmológica",
    rating: 4.6,
    schedule: {
      "15/05": ["09:00", "09:30", "10:00"],
      "16/05": ["08:30", "11:00"]
    }
  },
  {
    id: 5,
    name: "Dr. Carlos Eduardo",
    specialty: "Neurologista",
    image: "/",
    address: {
      street: "Rua das Flores, 120 - Centro",
      city: "Curitiba",
      state: "PR"
    },
    serviceType: "Consulta neurológica",
    rating: 4.7,
    schedule: {
      "17/05": ["10:00", "11:00"],
      "18/05": ["09:30", "10:30"]
    }
  },
  {
    id: 6,
    name: "Dra. Fernanda Lima",
    specialty: "Dermatologista",
    image: "/",
    address: {
      street: "Av. das Américas, 3000 - Barra da Tijuca",
      city: "Rio de Janeiro",
      state: "RJ"
    },
    serviceType: "Consulta dermatológica",
    rating: 4.9,
    schedule: {
      "16/05": ["08:00", "08:30", "09:30"],
      "17/05": ["10:00"]
    }
  },
  {
    id: 7,
    name: "Dr. Rafael Silva",
    specialty: "Cardiologista",
    image: "/",
    address: {
      street: "Rua 13 de Maio, 400 - Centro",
      city: "Belo Horizonte",
      state: "MG"
    },
    serviceType: "Consulta cardiológica",
    rating: 4.5,
    schedule: {
      "15/05": ["07:30", "08:00"],
      "18/05": ["13:00", "14:30"]
    }
  },
  {
    id: 8,
    name: "Dra. Marina Rocha",
    specialty: "Ortopedista",
    image: "/",
    address: {
      street: "Av. Sete de Setembro, 900 - Centro",
      city: "Porto Alegre",
      state: "RS"
    },
    serviceType: "Consulta ortopédica",
    rating: 4.6,
    schedule: {
      "15/05": ["08:00", "09:00"],
      "16/05": ["10:30", "11:30"]
    }
  }
];

export const specialties = [
  { value: "all", label: "Todas as especialidades" },
  { value: "dermatologista", label: "Dermatologista" },
  { value: "cardiologista", label: "Cardiologista" },
  { value: "ortopedista", label: "Ortopedista" },
  { value: "oftalmologista", label: "Oftalmologista" },
  { value: "neurologista", label: "Neurologista"},
];
