import { useEffect, useState } from "react";
import { Item } from "../types/Item";
import { listaTarefas, adicionaTarefa, atualizaTarefa, atualizaTituloDescricao, deleteTask } from "../services/taskService";

export const useTasks = () => {
  const [list, setList] = useState<Item[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks: Item[] = await listaTarefas();
        setList(tasks);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };
    fetchTasks();
  }, []);

  // 🔹 Criar nova tarefa
  const handleAddTask = async (titulo: string, descricao: string) => {
    try {
      const newTask = await adicionaTarefa(titulo, descricao);
      setList((prevList) => [newTask, ...prevList]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  // 🔹 Marcar tarefa como concluída
  const handleTaskChange = async (id: number, concluida: boolean) => {
    try {
      const task = list.find(task => task.id === id);
      if (!task) return;

      const updatedTask = await atualizaTarefa(id, task.titulo, task.descricao, concluida);

      setList((prevList) =>
        prevList.map(task =>
          task.id === id ? { ...task, concluida: updatedTask.concluida, dataConclusao: updatedTask.dataConclusao } : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  // 🔹 Editar título e descrição
  const handleEditTask = async (id: number, titulo: string, descricao: string) => {
    try {
      const updatedTask = await atualizaTituloDescricao(id, titulo, descricao);
      setList((prevList) =>
        prevList.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
      );
    } catch (error) {
      console.error("Erro ao editar a tarefa:", error);
    }
  };

  // 🔹 Deletar tarefa
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setList((prevList) => prevList.filter(task => task.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return { list, handleAddTask, handleTaskChange, handleEditTask, handleDeleteTask };
};
