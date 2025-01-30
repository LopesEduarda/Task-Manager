import * as C from "./App.styles";
import { ListItem } from "./components/ListItem";
import { AddArea } from "./components/AddArea";
import { useTasks } from "./hooks/useTasks";

const App = () => {
  const { list, handleAddTask, handleTaskChange, handleEditTask, handleDeleteTask } = useTasks();

  return (
    <C.Container>
      <C.Area>
        <C.Header>📚 Gerenciador de Tarefas</C.Header>

        <AddArea onEnter={handleAddTask} />

        {list.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onChange={handleTaskChange}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </C.Area>
    </C.Container>
  );
};

export default App;
