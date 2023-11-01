import React, { useState, useEffect } from "react";
import BoardView from "./BoardView";
import "../styles/Content.css";

function Content() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "todo" });

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error al cargar datos:", error));
  }, []);

  const addTask = () => {
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
      })
      .catch((error) => console.error("Error al agregar tarea:", error));
  };

  const editTask = (editedTask) => {
    fetch(`http://localhost:3001/tasks/${editedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    })
      .then((response) => response.json())
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === editedTask.id ? editedTask : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error al editar tarea:", error));
  };

  const deleteTask = (taskToDelete) => {
    fetch(`http://localhost:3001/tasks/${taskToDelete.id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error al eliminar tarea:", error));
  };

  const moveTask = (task, newStatus) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);
  
    fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, status: newStatus }),
    })
      .then((response) => response.json())
      .then(() => {
      })
      .catch((error) => console.error("Error al mover tarea:", error));
  };

  const moveTaskBackToTodo = (task) => {
    moveTask(task, "todo");
  };

  return (
    <div className="content">
      <div className="content-container">
        <h2>Backlog</h2>
        <div>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Descripción de la tarea"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <button onClick={addTask}>Añadir Tarea</button>
        </div>
        <div>
          <BoardView
            tasks={tasks}
            onEdit={editTask}
            onDelete={deleteTask}
            onMove={moveTask}
            onMoveBackToTodo={moveTaskBackToTodo}
            newTask={newTask}
          />
        </div>
      </div>
    </div>
  );
}

export default Content;