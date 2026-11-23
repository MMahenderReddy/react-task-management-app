import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';

function humanReadableDueDate(dueDate) {
  if (!dueDate) return 'No due date';
  const date = new Date(dueDate);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

const TaskCard = ({ task, onPriorityChange }) => {
  const now = new Date();
  const isOverdue = task.status === 'pending' && task.dueDate && new Date(task.dueDate) < now;

  return (
    <div className={`task-card${isOverdue ? ' overdue' : ''}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`status ${task.status}`}>{task.status}</span>
      </div>
      <div className="task-desc">{task.description}</div>
      <div className="task-meta">
        <span className="due-date">
          Due: <span className={isOverdue ? 'overdue-date' : ''}>{humanReadableDueDate(task.dueDate)}</span>
        </span>
        <span className="priority-label">
          Priority: {' '}
          <select
            value={task.priority}
            onChange={e => onPriorityChange(task.id, e.target.value)}
            className="priority-dropdown"
            aria-label="Change task priority"
          >
            {PRIORITY_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
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
    priority: PropTypes.oneOf(['Low', 'Medium', 'High']).isRequired,
  }).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

export default TaskCard;
