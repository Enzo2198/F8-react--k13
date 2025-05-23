import { useEffect, useRef, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { TodoAction } from "../../../utils";

interface TodoInputProps {
  dispatch: React.Dispatch<TodoAction>;
}

export default function TodoInput({ dispatch }: TodoInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed) {
      dispatch({ type: "add", payload: trimmed });
      setInput("");
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Box sx={{display: 'flex', flexGrow: 1, gap: 1}}>
      <TextField
        inputRef={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        label="Add item..."
        variant="outlined"
        fullWidth
      />
      <Button sx={{ height: "56px" }} variant="contained" onClick={handleAdd}>
        ADD
      </Button>
    </Box>
  );
}