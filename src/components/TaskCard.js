import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function TaskCard({ task, onPriorityChange }) {
  const handlePriorityChange = (e) => {
    onPriorityChange(task.id, e.target.value);
  };

  return (
    <div className={`task-card status-${task.status}`}>
      <div className="task-card-header">
        <span className="task-id">Task #{task.id}</span>
        <span className="task-status">{task.status}</span>
      </div>
      <div className="task-card-body">
        <div className="task-due-date">
          Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
        </div>
        <div className="task-priority">
          Priority:{' '}
          <select
            value={task.priority || 'medium'}
            onChange={handlePriorityChange}
            className="task-priority-select"
            aria-label="Change task priority"
          >
            {PRIORITY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.oneOf(['pending', 'completed']).isRequired,
    dueDate: PropTypes.string,
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
  }).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

export default TaskCard;
