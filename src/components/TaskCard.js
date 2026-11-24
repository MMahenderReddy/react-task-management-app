import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';

function isOverdue(task) {
  if (!task.dueDate) return false;
  const now = new Date();
  const due = new Date(task.dueDate);
  // Only overdue if due date is in the past and not completed
  return due < now && task.status !== 'completed';
}

const TaskCard = ({ task }) => {
  const overdue = isOverdue(task);
  return (
    <div className={`task-card${overdue ? ' overdue' : ''}`}>
      <div className="task-title">{task.title || `Task #${task.id}`}</div>
      <div className="task-desc">{task.description}</div>
      <div className="task-meta">
        <span className="task-priority">Priority: {task.priority || 'N/A'}</span>
        <span className="task-status">Status: {task.status}</span>
        <span className="task-due">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</span>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
  }).isRequired,
};

export default TaskCard;
