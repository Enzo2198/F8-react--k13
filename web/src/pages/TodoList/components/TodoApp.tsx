import { useReducer } from "react";
import {Box, Typography} from "@mui/material";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { todoReducer } from "../reducers/todoReducer";
import { Todo } from "../../../utils";
import "../style.css"

export default function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, [] as Todo[]);

  return (
    <Box className={"container"}>
      <Box sx={{width: 500}}>
        <Typography className={"header"} sx={{color: 'red'}} variant="h4" gutterBottom>
          Todo List
        </Typography>
        <TodoInput dispatch={dispatch} />
        <TodoList todos={todos} dispatch={dispatch} />

      </Box>
    </Box>

  );
}