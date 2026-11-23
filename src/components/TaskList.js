import React from 'react';
import PropTypes from 'prop-types';
import { humanReadableDueDate } from '../utils/dateUtils';
import './TaskList.css';

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function isOverdue(task) {
  if (!task.dueDate) return false;
  if (task.status === 'completed') return false;
  return new Date(task.dueDate) < new Date();
}

const TaskList = ({ tasks, onPriorityChange }) => {
  if (!tasks.length) {
    return <div className="task-list-empty">No tasks found.</div>;
  }
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`task-card${isOverdue(task) ? ' overdue' : ''}`}
        >
          <div className="task-card-header">
            <div className="task-title">{task.title || `Task #${task.id}`}</div>
            <select
              className="priority-dropdown"
              value={task.priority || 'medium'}
              onChange={e => onPriorityChange(task.id, e.target.value)}
              aria-label="Change priority"
            >
              {PRIORITY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="task-desc">{task.description || <em>No description</em>}</div>
          <div className="task-meta">
            <span className="task-status">{task.status === 'completed' ? '✅ Completed' : '⏳ Pending'}</span>
            <span className="task-due">{humanReadableDueDate(task.dueDate)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.oneOf(['pending', 'completed']).isRequired,
      dueDate: PropTypes.string,
      priority: PropTypes.oneOf(['low', 'medium', 'high']),
    })
  ).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

export default TaskList;
