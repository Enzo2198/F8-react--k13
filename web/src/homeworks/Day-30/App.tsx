import './App.css';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

interface Todo {
    id: number;
    text: string;
}

function App() {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);

    const onInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const getNextId = (): number => {
        if (todos.length === 0) return 1;
        const maxId = Math.max(...todos.map(todo => todo.id));
        return maxId + 1;
    };

    const onAddToDo = () => {
        if (inputValue.trim() === '') return;

        if (todos.some(todo => todo.text.toLowerCase() === inputValue.toLowerCase())) {
            alert('Task already exists!');
            return;
        }

        const newTodo: Todo = {
            id: getNextId(),
            text: inputValue
        };

        setTodos([...todos, newTodo]);
        setInputValue('');
    };

    const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onAddToDo();
        }
    };

    const onRemove = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
      <div className="container">
          <h1>To Do List</h1>
          <div className="input-container">
              <input
                type="text"
                className="new-task"
                value={inputValue}
                onInput={onInput}
                onKeyDown={onEnter}
                placeholder="Add note..."
              />
              <button className="add-btn" onClick={onAddToDo} type="submit">
                  Add
              </button>
          </div>

          <div id="task-list">
              {todos.map((task: Todo) => (
                <div className="task-item" key={task.id}>
                    <div className="task">{task.text}</div>
                    <button className="delete-btn" onClick={() => onRemove(task.id)}>
                        Delete
                    </button>
                </div>
              ))}
          </div>
      </div>
    );
}

export default App;
