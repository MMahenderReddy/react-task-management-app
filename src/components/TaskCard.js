import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';

function formatDueDate(dueDate) {
  if (!dueDate) return 'No due date';
  const date = new Date(dueDate);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const TaskCard = ({ task, onPriorityChange }) => {
  const now = new Date();
  const isOverdue = task.status === 'pending' && task.dueDate && new Date(task.dueDate) < now;

  return (
    <div className={`task-card${isOverdue ? ' overdue' : ''}`}>
      <div className="task-header">
        <span className="task-title">{task.title}</span>
        <span className={`task-status ${task.status}`}>{task.status}</span>
      </div>
      <div className="task-desc">{task.description}</div>
      <div className="task-meta">
        <span className="task-due">Due: {formatDueDate(task.dueDate)}</span>
        <span className="task-priority">
          Priority:{' '}
          <select
            value={task.priority || 'medium'}
            onChange={e => onPriorityChange(task.id, e.target.value)}
            aria-label="Change priority"
          >
            {PRIORITY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['pending', 'completed']).isRequired,
    dueDate: PropTypes.string,
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
  }).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

export default TaskCard;
