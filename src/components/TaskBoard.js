import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './TaskBoard.css';

const COLUMN_DEFS = [
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
];

function isOverdue(task) {
  if (task.status === 'completed') return false;
  if (!task.dueDate) return false;
  const now = new Date();
  return new Date(task.dueDate) < now;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

function PriorityBadge({ priority }) {
  if (!priority) return null;
  const label = priority.charAt(0).toUpperCase() + priority.slice(1);
  return <span className={`priority-badge ${priority}`}>{label}</span>;
}

function TaskCard({ task, onEdit, onDragStart, onDragEnd, onDrop, dragging }) {
  const overdue = isOverdue(task);
  return (
    <div
      className={`task-card${overdue ? ' overdue' : ''}${dragging ? ' dragging' : ''}`}
      draggable
      onDragStart={e => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      onDrop={e => onDrop && onDrop(e, task)}
      onDragOver={e => e.preventDefault()}
    >
      {overdue && task.status !== 'completed' && (
        <div className="overdue-text">Overdue</div>
      )}
      <div className="task-title">{task.title}</div>
      <div className="task-desc">{task.description}</div>
      <div className="task-meta">
        <PriorityBadge priority={task.priority} />
        <span className="due-date">Due: {formatDate(task.dueDate)}</span>
        <span className="status">{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
      </div>
      <button style={{position:'absolute',top:8,right:8,fontSize:'0.95rem'}} onClick={e => {e.stopPropagation();onEdit(task);}}>Edit</button>
    </div>
  );
}

function TaskBoard({ tasks, onEditTask, onMoveTask }) {
  const [draggedTask, setDraggedTask] = useState(null);

  // Group tasks by status
  const columns = useMemo(() => {
    const map = { pending: [], completed: [] };
    tasks.forEach(task => {
      if (map[task.status]) map[task.status].push(task);
    });
    return map;
  }, [tasks]);

  // Drag and drop logic
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
  };
  const handleDragEnd = () => setDraggedTask(null);

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.status === status) return;
    onMoveTask(draggedTask, status);
    setDraggedTask(null);
  };

  return (
    <div className="task-board">
      {COLUMN_DEFS.map(col => (
        <div
          key={col.key}
          className="board-column"
          onDragOver={e => e.preventDefault()}
          onDrop={e => handleDrop(e, col.key)}
        >
          <div className="board-column-header">
            {col.label}
            <span className="column-count-badge">{columns[col.key].length}</span>
          </div>
          {columns[col.key].map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              dragging={draggedTask && draggedTask.id === task.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

TaskBoard.propTypes = {
  tasks: PropTypes.array.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onMoveTask: PropTypes.func.isRequired,
};

export default TaskBoard;
