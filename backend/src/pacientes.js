// src/pacientes.js
import { db } from './services/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// Cria um novo paciente vinculado a um usuário
export async function criarPaciente(idUsuario, dataNascimento, telefone) {
  try {
    const docRef = await addDoc(collection(db, "pacientes"), {
      id_usuario: idUsuario,
      data_nascimento: dataNascimento,
      telefone: telefone
    });
    console.log("Paciente criado com ID:", docRef.id);
    return docRef.id; // Retorna o id_paciente
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    throw error;
  }
}
