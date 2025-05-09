// src/usuarios.js
import { db } from './services/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// Cria um novo usuário
export async function criarUsuario(nome, email, senha, tipo) {
  try {
    const docRef = await addDoc(collection(db, "usuarios"), {
      nome: nome,
      email: email,
      senha: senha,  // Depois podemos melhorar usando hash!
      tipo: tipo,    // 'admin', 'medico' ou 'paciente'
      criado_em: new Date()
    });
    console.log("Usuário criado com ID:", docRef.id);
    return docRef.id; // Retorna o id_usuario
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}
