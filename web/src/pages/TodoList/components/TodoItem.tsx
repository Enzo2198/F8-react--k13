import {memo, useState} from "react";
import { Box, Button, TextField } from "@mui/material";
import { Todo, TodoAction } from "../../../utils";
import '../style.css'

interface TodoItemProps {
  todo: Todo;
  dispatch: React.Dispatch<TodoAction>;
}

function TodoItem({ todo, dispatch }: TodoItemProps) {
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleEdit = () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      dispatch({ type: "edit", payload: { id: todo.id, text: trimmedText } });
    } else {
      setText(todo.text);
    }
    setEditing(false);
  };

  return (
    <Box className={'list-style'}>
      {isEditing ? (
        <TextField
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          fullWidth
        />
      ) : (
        <Box sx={{ flexGrow: 1, alignSelf: "center" }}>{todo.text}</Box>
      )}
      <Button variant="outlined" onClick={() => setEditing(true)}>
        Edit
      </Button>
      <Button
        color="error"
        variant="outlined"
        onClick={() => dispatch({ type: "delete", payload: todo.id })}
      >
        Delete
      </Button>
    </Box>
  );
}

export default memo(TodoItem)