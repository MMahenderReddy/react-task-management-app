import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function getRelativeDueDate(dueDate, status) {
  if (!dueDate) return '';
  const now = new Date();
  const due = new Date(dueDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = due - now;
  const diffDays = Math.ceil(diffMs / msPerDay);
  if (status === 'completed') {
    return 'Completed';
  }
  if (diffMs > 0) {
    if (diffDays === 1) return 'Due in 1 day';
    return `Due in ${diffDays} days`;
  } else {
    const overdueDays = Math.abs(Math.min(0, diffDays));
    if (overdueDays === 1) return 'Overdue by 1 day';
    return `Overdue by ${overdueDays} days`;
  }
}

const TaskCard = ({ task, onPriorityChange }) => {
  const isOverdue = task.status === 'pending' && new Date(task.dueDate) < new Date();
  return (
    <div className={`task-card${isOverdue ? ' overdue' : ''}`}>
      <div className="task-card-header">
        <span className="task-title">{task.title}</span>
        <span className={`task-priority priority-${task.priority}`}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
      </div>
      <div className="task-desc">{task.description}</div>
      <div className="task-meta">
        <span className="task-status">{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
        <span className="task-due-date">{getRelativeDueDate(task.dueDate, task.status)}</span>
      </div>
      <div className="task-actions">
        <label htmlFor={`priority-${task.id}`}>Priority: </label>
        <select
          id={`priority-${task.id}`}
          value={task.priority}
          onChange={e => onPriorityChange(task.id, e.target.value)}
        >
          {PRIORITY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string,
    dueDate: PropTypes.string,
  }).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

export default TaskCard;
