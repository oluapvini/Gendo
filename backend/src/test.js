// src/test.js
import { criarUsuario } from './usuarios.js';
import { criarPaciente } from './pacientes.js';
import { criarMedico } from './medicos.js';
import { criarConsulta } from './consultas.js';

async function rodarTestes() {
  // Criar um usuário paciente
  const idUsuarioPaciente = await criarUsuario("João da Silva", "joao@email.com", "senha123", "paciente");
  await criarPaciente(idUsuarioPaciente, "1990-05-15", "(21) 99999-9999");

  // Criar um usuário médico
  const idUsuarioMedico = await criarUsuario("Dra. Maria", "maria@hospital.com", "senha456", "medico");
  await criarMedico(idUsuarioMedico, "CRM12345", "Cardiologia");

  // Criar uma consulta entre eles
  await criarConsulta(idUsuarioMedico, idUsuarioPaciente, "2025-05-01T10:00:00");
}

rodarTestes();
