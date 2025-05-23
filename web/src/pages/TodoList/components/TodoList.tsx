import { Box } from "@mui/material";
import TodoItem from "./TodoItem";
import { Todo, TodoAction } from "../../../utils";

interface TodoListProps {
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>;
}

export default function TodoList({ todos, dispatch }: TodoListProps) {
  return (
    <Box sx={{ mt: 2 }}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </Box>
  );
}