import { useReducer } from "react";
import {Box} from "@mui/material";
import TodoInput from "./components/TodoInput.tsx";
import TodoList from "./components/TodoList.tsx";
import { todoReducer } from "./reducers/todoReducer.ts";
import { Todo } from "../../utils";
import "./style.css"

export default function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, [] as Todo[]);

  return (
    <Box className={"container"}>
      <Box sx={{width: 500}}>
        <Box className={"header"}>
          <h1>Todo List</h1>
        </Box>

        <Box className={"body"}>
          <TodoInput dispatch={dispatch} />
          <TodoList todos={todos} dispatch={dispatch} />
        </Box>


      </Box>
    </Box>

  );
}


