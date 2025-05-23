import { Todo, TodoAction } from "../../../utils";

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), text: action.payload, isEditing: false },
      ];
    case "delete":
      return state.filter((todo) => todo.id !== action.payload);
    case "edit":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    default:
      return state;
  }
}
