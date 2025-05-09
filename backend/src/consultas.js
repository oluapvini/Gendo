// src/consultas.js
import { db } from './services/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// Cria uma nova consulta entre médico e paciente
export async function criarConsulta(idMedico, idPaciente, dataHora) {
  try {
    const docRef = await addDoc(collection(db, "consultas"), {
      id_medico: idMedico,
      id_paciente: idPaciente,
      data_hora: dataHora,
      status: "agendada" // status inicial
    });
    console.log("Consulta criada com ID:", docRef.id);
    return docRef.id; // Retorna o id_consulta
  } catch (error) {
    console.error("Erro ao criar consulta:", error);
    throw error;
  }
}
