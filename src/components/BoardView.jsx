import React from "react";
import Task from "./Task";
import "../styles/BoardView.css";

function BoardView({ tasks, onEdit, onDelete, onMove, newTask }) {
  // Separate tasks into different columns
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = [...tasks, newTask].filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  // Add a function to go back to the "to do" status
  const onMoveBackToTodo = (task) => {
    onMove(task, "todo");
  };

  return (
    <div className="board-view">
      <div className="board-column">
        <h2>To Do</h2>
        {todoTasks.map((task) => (
          <Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />
        ))}
      </div>
      <div className="board-column">
        <h2>In Progress</h2>
        {inProgressTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
            onMoveBackToTodo={onMoveBackToTodo}
          />
        ))}
      </div>
      <div className="board-column">
        <h2>Done</h2>
        {doneTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
            onMoveBackToTodo={onMoveBackToTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardView;
