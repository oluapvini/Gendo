export const doctors = [
  {
    id: 1,
    name: "Dr. Thomas Turbelin",
    specialty: "Dermatologista",
    image: "https://58b04f5940c1474e557e363a.redesign.static-01.com/l/images/por-que-as-pessoas-chamam-os-medicos-de-doutor.jpg", // male doctor
    address: {
      street: "Rua Conde de Bonfim, 112 - Tijuca",
      city: "Rio de Janeiro",
      state: "RJ",
    },
    serviceType: "Consulta dermatológica",
    rating: 4.8,
    schedule: {
      "10/06": ["08:00", "09:30", "11:00"],
      "12/06": ["10:00", "14:00", "15:30"],
      "15/06": ["09:00", "13:30", "16:00"],
      "18/06": ["08:30", "12:00"],
    },
  },
  {
    id: 2,
    name: "Dra. Ana Beatriz Costa",
    specialty: "Cardiologista",
    image: "https://empreendedor.com.br/wp-content/uploads/2021/01/rsw_350h_263i_truecg_trueft_cover.jpg", // female doctor
    address: {
      street: "Av. das Américas, 500 - Barra da Tijuca",
      city: "Rio de Janeiro",
      state: "RJ",
    },
    serviceType: "Consulta cardiológica",
    rating: 4.9,
    schedule: {
      "11/06": ["07:30", "09:00", "10:30", "16:00"],
      "13/06": ["08:00", "11:30", "14:30"],
      "16/06": ["09:00", "12:00", "15:00", "17:30"],
    },
  },
  {
    id: 3,
    name: "Dr. Roberto Menezes",
    specialty: "Ortopedista",
    image: "https://redeodontobrasil.com.br/wp-content/uploads/2023/02/takeo-1.jpg", // male doctor
    address: {
      street: "Rua Visconde de Pirajá, 351 - Ipanema",
      city: "Rio de Janeiro",
      state: "RJ",
    },
    serviceType: "Consulta ortopédica",
    rating: 4.7,
    schedule: {
      "09/06": ["08:30", "10:00"],
      "12/06": ["13:00", "14:30", "16:00"],
      "14/06": ["09:30", "11:30", "15:00"],
      "17/06": ["08:00", "12:30"],
    },
  },
  {
    id: 4,
    name: "Dra. Juliana Souza",
    specialty: "Oftalmologista",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b9642732", // female doctor
    address: {
      street: "Av. Paulista, 1500 - Bela Vista",
      city: "São Paulo",
      state: "SP",
    },
    serviceType: "Consulta oftalmológica",
    rating: 4.6,
    schedule: {
      "10/06": ["09:00", "10:30", "12:00"],
      "13/06": ["08:30", "11:00", "13:30"],
      "16/06": ["10:00", "14:00", "16:30"],
    },
  },
  {
    id: 5,
    name: "Dr. Carlos Eduardo",
    specialty: "Neurologista",
    image: "https://images.unsplash.com/photo-1604709177225-cb9b0fbd9d1d", // male doctor
    address: {
      street: "Rua das Flores, 120 - Centro",
      city: "Curitiba",
      state: "PR",
    },
    serviceType: "Consulta neurológica",
    rating: 4.7,
    schedule: {
      "11/06": ["08:00", "09:30", "11:00"],
      "14/06": ["13:00", "15:30"],
      "17/06": ["10:00", "12:30", "16:00"],
    },
  },
  {
    id: 6,
    name: "Dra. Fernanda Lima",
    specialty: "Dermatologista",
    image: "https://images.unsplash.com/photo-1584467735871-bd6c0bc87484", // female doctor
    address: {
      street: "Av. das Américas, 3000 - Barra da Tijuca",
      city: "Rio de Janeiro",
      state: "RJ",
    },
    serviceType: "Consulta dermatológica",
    rating: 4.9,
    schedule: {
      "12/06": ["08:00", "08:30", "09:30", "11:00"],
      "15/06": ["10:00", "14:30"],
      "19/06": ["09:00", "13:00", "15:30"]
    },
  },
  {
    id: 7,
    name: "Dr. Rafael Silva",
    specialty: "Cardiologista",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309", // male doctor
    address: {
      street: "Rua 13 de Maio, 400 - Centro",
      city: "Belo Horizonte",
      state: "MG",
    },
    serviceType: "Consulta cardiológica",
    rating: 4.5,
    schedule: {
      "10/06": ["07:30", "08:00", "09:15"],
      "13/06": ["10:00", "11:30", "14:00"],
      "18/06": ["13:00", "14:30", "16:00", "17:15"]
    },
  },
  {
    id: 8,
    name: "Dra. Marina Rocha",
    specialty: "Ortopedista",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1", // female doctor
    address: {
      street: "Av. Sete de Setembro, 900 - Centro",
      city: "Porto Alegre",
      state: "RS",
    },
    serviceType: "Consulta ortopédica",
    rating: 4.6,
    schedule: {
      "09/06": ["08:00", "09:00", "10:30"],
      "11/06": ["10:30", "11:30", "13:00"],
      "14/06": ["09:00", "12:00", "15:00"],
      "17/06": ["08:30", "10:00"]
    },
  },
];

export const specialties = [
  { value: "all", label: "Todas as especialidades" },
  { value: "dermatologista", label: "Dermatologista" },
  { value: "cardiologista", label: "Cardiologista" },
  { value: "ortopedista", label: "Ortopedista" },
  { value: "oftalmologista", label: "Oftalmologista" },
  { value: "neurologista", label: "Neurologista" },
];