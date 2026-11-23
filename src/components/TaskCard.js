import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';

function humanReadableDueDate(dueDate) {
  if (!dueDate) return 'No due date';
  const date = new Date(dueDate);
  const now = new Date();
  const diffMs = date - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffMs < 0) {
    return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'}`;
  } else if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays === 1) {
    return 'Due tomorrow';
  } else {
    return `Due in ${diffDays} days`;
  }
}

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const TaskCard = ({ task, onPriorityChange }) => {
  const isOverdue = task.status === 'pending' && task.dueDate && new Date(task.dueDate) < new Date();
  return (
    <div className={`task-card${isOverdue ? ' overdue' : ''}`}>
      <div className="task-title">{task.title}</div>
      <div className="task-desc">{task.description}</div>
      <div className="task-meta">
        <span className={`task-due-date${isOverdue ? ' overdue' : ''}`}>{humanReadableDueDate(task.dueDate)}</span>
        <span className="task-status">{task.status}</span>
      </div>
      <div className="task-priority">
        <label htmlFor={`priority-${task.id}`}>Priority:</label>
        <select
          id={`priority-${task.id}`}
          value={task.priority || 'medium'}
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
    status: PropTypes.oneOf(['pending', 'completed']).isRequired,
    dueDate: PropTypes.string,
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
  }).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

export default TaskCard;
