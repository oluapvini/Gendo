// src/medicos.js
import { db } from './services/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// Cria um novo médico vinculado a um usuário
export async function criarMedico(idUsuario, crm, especialidade) {
  try {
    const docRef = await addDoc(collection(db, "medicos"), {
      id_usuario: idUsuario,
      crm: crm,
      especialidade: especialidade
    });
    console.log("Médico criado com ID:", docRef.id);
    return docRef.id; // Retorna o id_medico
  } catch (error) {
    console.error("Erro ao criar médico:", error);
    throw error;
  }
}
