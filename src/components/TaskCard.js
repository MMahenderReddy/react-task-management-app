import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';

function isOverdue(task) {
  if (!task.dueDate || task.status !== 'pending') return false;
  const now = new Date();
  return new Date(task.dueDate) < now;
}

const TaskCard = ({ task }) => {
  const overdue = isOverdue(task);
  return (
    <div className={`task-card${overdue ? ' overdue' : ''}`}>
      <div><strong>ID:</strong> {task.id}</div>
      <div><strong>Status:</strong> {task.status}</div>
      <div><strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleString() : 'N/A'}</div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.oneOf(['pending', 'completed']).isRequired,
    dueDate: PropTypes.string,
  }).isRequired,
};

export default TaskCard;
