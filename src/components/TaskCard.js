import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';

function getRelativeDueString(dueDate, status) {
  if (!dueDate) return '';
  const now = new Date();
  const due = new Date(dueDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.floor((due - now) / msPerDay);
  if (status === 'completed') {
    return `Completed`;
  }
  if (diff > 0) {
    return `Due in ${diff} day${diff !== 1 ? 's' : ''}`;
  } else if (diff === 0) {
    return 'Due today';
  } else {
    return `Overdue by ${Math.abs(diff)} day${Math.abs(diff) !== 1 ? 's' : ''}`;
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
      <div className="task-card-header">
        <span className="task-title">{task.title}</span>
        <span className={`task-status status-${task.status}`}>{task.status}</span>
      </div>
      <div className="task-desc">{task.description}</div>
      <div className="task-meta">
        <div className="task-due">{getRelativeDueString(task.dueDate, task.status)}</div>
        <div className="task-priority">
          <label htmlFor={`priority-${task.id}`}>Priority:</label>
          <select
            id={`priority-${task.id}`}
            value={task.priority || 'medium'}
            onChange={e => onPriorityChange(task.id, e.target.value)}
            disabled={task.status === 'completed'}
          >
            {PRIORITY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
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
    dueDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

export default TaskCard;
