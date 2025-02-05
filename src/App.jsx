import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  // Load todos from localStorage on first render
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  // ✅ Only update localStorage inside state update functions, not in useEffect

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (!todo.trim()) return; // Prevent adding empty todos

    const now = new Date();
    const formattedTime = now.toLocaleString(); // Simpler time formatting

    setTodos((prevTodos) => {
      const updatedTodos = [
        ...prevTodos,
        { id: uuidv4(), todo, time: formattedTime, isCompleted: false },
      ];
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); // ✅ Save immediately
      return updatedTodos;
    });

    setTodo("");
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); // ✅ Save immediately
      return updatedTodos;
    });
  };

  const handleEdit = (e, id) => {
    const currentTodo = todos.find((item) => item.id === id);
    if (!currentTodo) return;

    const newTodo = prompt("Edit the todo", currentTodo.todo);
    if (newTodo) {
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((item) =>
          item.id === id ? { ...item, todo: newTodo } : item
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos)); // ✅ Save immediately
        return updatedTodos;
      });
    } else {
      handleDelete(e, id); // Delete if input is empty
    }
  };

  const handleDelete = (e, id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((item) => item.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); // ✅ Save immediately
      return updatedTodos;
    });
  };

  const toggleFinish = (e) => {
    setShowFinished(!showFinished);
  };

  return (
    <div>
      <Navbar />
      <div className="md:container bg-slate-500 text-gray-100 p-6 items-center mx-4 md:mx-auto my-4 min-h-screen rounded-2xl">
        <div className="addTodo flex flex-col items-center mb-11">
          <h1 className="text-2xl font-bold hover:underline m-3">Add a Todo</h1>
          <div className="flex gap-3 items-center">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter a todo"
              className="md:w-xl w-[90%] p-2 my-2 rounded-md border-2 border-white"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length == 0}
              className="bg-blue-600 disabled:bg-blue-400 text-white px-3 h-10 py-1 rounded-md font-bold hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-bold hover:underline m-3">Your Todos</h1>
        <input
          type="checkbox"
          onChange={toggleFinish}
          checked={showFinished}
        />{" "}
        ShowFinished
        <div className="todos py-1">
          {todos.length === 0 && (
            <div className="text-2xl text-gray-950 text-center">
              No Todos ;)
            </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex md:w-3/4 w-full content-center justify-evenly gap-2 md:justify-between my-2.5 items-center"
                >
                  <div className="cont text-slate-900 bg-gray-300 rounded-lg p-2 flex gap-2 items-center">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className="flex flex-col gap-1">
                      <div
                        className={
                          item.isCompleted ? "line-through text-lg" : "text-lg"
                        }
                      >
                        {item.todo}
                      </div>
                      <div className="time text-sm">{item.time}</div>
                    </div>
                  </div>
                  <div className="button flex flex-col gap-1.5">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-blue-500 text-white px-3 h-8 py-1 rounded-md font-bold hover:bg-blue-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-blue-500 text-white px-3 h-8 py-1 rounded-md font-bold hover:bg-blue-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
