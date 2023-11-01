import React, { useState } from "react";
import "../styles/Content.css"; 

function Task({ task, onEdit, onDelete, onMove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    onMove(task, newStatus);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
          <button className="edit-button" onClick={handleEdit}>
            Guardar
          </button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Editar
          </button>
          <button className="delete-button" onClick={() => onDelete(task)}>
            Borrar
          </button>
          <button className="status-button" onClick={() => handleStatusChange("in-progress")}>
            En Progreso
          </button>
          <button className="status-button" onClick={() => handleStatusChange("done")}>
            Completado
          </button>
        </div>
      )}
    </div>
  );
}

export default Task;