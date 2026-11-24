import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './TaskBoard.css';

const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const PRIORITY_CLASS = {
  low: 'priority-low',
  medium: 'priority-medium',
  high: 'priority-high',
};

function isOverdue(task) {
  if (!task.dueDate) return false;
  if (task.status === 'completed') return false;
  const due = new Date(task.dueDate);
  const now = new Date();
  return due < now;
}

function TaskCard({ task, onPriorityChange, onDragStart, onDragEnd, onDrop }) {
  const overdue = isOverdue(task);
  return (
    <div
      className={`task-card${overdue ? ' overdue' : ''}`}
      draggable
      onDragStart={e => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      onDrop={e => onDrop && onDrop(e, task)}
      data-task-id={task.id}
    >
      <div className={`task-title${overdue ? ' overdue' : ''}`}>{task.title}</div>
      <div className="task-desc">{task.description}</div>
      <div className="task-meta">
        <span className={`priority-badge ${PRIORITY_CLASS[task.priority]}`}>{PRIORITY_LABELS[task.priority]}</span>
        <select
          className="edit-priority-select"
          value={task.priority}
          onChange={e => onPriorityChange(task, e.target.value)}
          aria-label="Edit priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</span>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onPriorityChange: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDrop: PropTypes.func,
};

function TaskBoard({ tasks, onPriorityChange, onStatusChange }) {
  // Split tasks by status
  const columns = useMemo(() => [
    {
      key: 'pending',
      title: 'Pending',
      tasks: tasks.filter(t => t.status === 'pending'),
    },
    {
      key: 'completed',
      title: 'Done',
      tasks: tasks.filter(t => t.status === 'completed'),
    },
  ], [tasks]);

  // Drag-and-drop logic
  const [draggedTaskId, setDraggedTaskId] = React.useState(null);

  const handleDragStart = (e, task) => {
    setDraggedTaskId(task.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  const handleDropColumn = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;
    const task = tasks.find(t => String(t.id) === String(taskId));
    if (!task || task.status === status) return;
    onStatusChange(task, status);
    setDraggedTaskId(null);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  return (
    <div className="task-board">
      {columns.map(col => (
        <div
          key={col.key}
          className="board-column"
          onDrop={e => handleDropColumn(e, col.key)}
          onDragOver={handleDragOver}
        >
          <div className="board-column-header">
            <span className="board-column-title">{col.title}</span>
            <span className="board-column-badge">{col.tasks.length}</span>
          </div>
          <div className="task-list">
            {col.tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onPriorityChange={onPriorityChange}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

TaskBoard.propTypes = {
  tasks: PropTypes.array.isRequired,
  onPriorityChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default TaskBoard;
