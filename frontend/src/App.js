import React, { useEffect, useState } from "react";
import { API } from "./api";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await API.get("/todos");
    setTodos(res.data);
  };

  // Add todo
  const addTodo = async () => {
    if (!text) return;
    await API.post("/todos", { text });
    setText("");
    fetchTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };
  return (
    <div className="container">
      <h2>MERN To-Do App</h2>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter a task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
