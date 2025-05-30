import './App.css'
import {useState} from "react";

interface Todo {
    id: string;
    text: string;
}


function App() {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);

    const onInput = (event: any) => {
        setInputValue(event.target.value);
    }

    const onAddToDo = () => {
        if (inputValue.trim() === '') return;
        if (todos.includes(inputValue)) {
            alert('Task already exists!');
            return;
        }
        setTodos([...todos, inputValue]);
        setInputValue('');
    }

    const onEnter = (event) => {
        if (event.key === 'Enter') {
            onAddToDo();
        }
    }

    const onRemove = (index: number) => {
        const removed = [...todos];
        removed.splice(index, 1)
        setTodos(removed);

    }

    return (
        <>
            <div className="container">
                <h1>To Do List</h1>
                <div className='input-container'>
                    <input type="text" className="new-task" onInput={onInput} onKeyDown={onEnter} value={inputValue}
                           placeholder="Add note..."/>
                    <button className="add-btn" onClick={onAddToDo} type="submit">Add</button>
                </div>

                <div id="task-list">
                    {
                        todos.map((task: Todo, index: number) => {
                            return (
                                <div className='task-item' key={index}>
                                    <div className="task">{task}</div>
                                    <button className='delete-btn' onClick={() => {
                                        onRemove(index)
                                    }}>Delete
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default App;
