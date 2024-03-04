import React, { useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setTitleError(true);
    }
    if (description.trim() === "") {
      setDescriptionError(true);
    }
    if (title.trim() !== "" && description.trim() !== "") {
      const newTodo = {
        id: Math.floor(Math.random() * 1000),
        title: title,
        description: description,
        completed: false,
      };
      setTodoList([newTodo, ...todoList]);
      setTitle("");
      setDescription("");
      setTitleError(false);
      setDescriptionError(false);
    }
  };

  const handleTodoDelete = (id) => {
    const newTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodos);
  };

  const handleTodoComplete = (id) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id
        ? { ...todo, completed: true, completedAt: new Date() }
        : todo
    );
    const completedTodo = updatedTodos.find((todo) => todo.id === id);
    setCompletedList([completedTodo, ...completedList]);
    setTodoList(updatedTodos.filter((todo) => todo.id !== id));
  };

  const handleCompletedDelete = (id) => {
    const newCompletedList = completedList.filter((todo) => todo.id !== id);
    setCompletedList(newCompletedList);
  };

  return (
    <div className="App">
      <h1 className="my-todos">My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label className="input-label" htmlFor="">
              Title:
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={`input ${titleError ? "error" : ""}`}
              type="text"
              placeholder="What's the title of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label className="input-label" htmlFor="">
              Description:
            </label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className={`input ${descriptionError ? "error" : ""}`}
              type="text"
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <button onClick={handleAddTodo} className="add-button">
              Add
            </button>
          </div>
        </div>
        <hr />
        <div className="button-wrapper">
          <button
            className={`todo-button ${!showCompleted ? "green" : "grey"}`}
            onClick={() => setShowCompleted(false)}
          >
            ToDo
          </button>
          <button
            className={`todo-button ${showCompleted ? "green" : "grey"}`}
            onClick={() => setShowCompleted(true)}
          >
            Completed
          </button>
        </div>
        {showCompleted
          ? completedList.map((item) => (
              <div key={item.id} className="todo-list-wrapper">
                <div className="todo-list">
                  <h3 className="completed-list-title">{item.title}</h3>
                  <p className="completed-list-description">
                    {item.description}
                  </p>
                  <p className="completed-info">
                    Completed at: {item.completedAt.toLocaleString()}
                  </p>
                </div>
                <div className="icon-wrapper">
                  <AiOutlineDelete
                    onClick={() => handleCompletedDelete(item.id)}
                    className="delete-icon"
                  />
                </div>
              </div>
            ))
          : todoList.map((item) => (
              <div key={item.id} className="todo-list-wrapper">
                <div className="todo-list">
                  <h3 className="todo-list-title">{item.title}</h3>
                  <p className="todo-list-description">{item.description}</p>
                </div>
                <div className="icon-wrapper">
                  {!item.completed && (
                    <TiTick
                      onClick={() => handleTodoComplete(item.id)}
                      className="tic-icon"
                    />
                  )}
                  <AiOutlineDelete
                    onClick={() => handleTodoDelete(item.id)}
                    className="delete-icon"
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;



