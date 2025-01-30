import axios from "axios";
import { API_URL } from "../config/config";

export const listaTarefas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const adicionaTarefa = async (titulo: string, descricao: string) => {
  const response = await axios.post(API_URL, {
    titulo,
    descricao,
    done: false,
  });
  return response.data;
};

export const atualizaTarefa = async (id: number, titulo: string, descricao: string, concluida: boolean) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    titulo,
    descricao,
    concluida,
    dataConclusao: concluida ? new Date().toISOString() : null,
  });
  return response.data;
};

export const atualizaTituloDescricao = async (id: number, titulo: string, descricao: string) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      titulo,
      descricao
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
    throw error;
  }
};



export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
