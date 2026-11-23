import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';

const PRIORITIES = ['Low', 'Medium', 'High'];

function formatDueDate(dueDate) {
  if (!dueDate) return 'No due date';
  const date = new Date(dueDate);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const TaskCard = ({ task, onPriorityChange }) => {
  const now = new Date();
  const isOverdue = task.status === 'pending' && task.dueDate && new Date(task.dueDate) < now;

  return (
    <div className={`task-card${isOverdue ? ' overdue' : ''}`}>
      <div className="task-title">{task.title || `Task #${task.id}`}</div>
      <div className="task-desc">{task.description || <em>No description</em>}</div>
      <div className="task-meta">
        <span className="task-due">
          Due: <span className={isOverdue ? 'overdue-date' : ''}>{formatDueDate(task.dueDate)}</span>
        </span>
        <span className="task-status">Status: {task.status}</span>
        <span className="task-priority">
          Priority:{' '}
          <select
            value={task.priority || 'Medium'}
            onChange={e => onPriorityChange(task.id, e.target.value)}
            aria-label="Change task priority"
          >
            {PRIORITIES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    status: PropTypes.oneOf(['pending', 'completed']).isRequired,
    priority: PropTypes.string,
  }).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

export default TaskCard;
