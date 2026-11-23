import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';
import { formatDueDate } from '../utils/dateUtils';

const TaskCard = ({ task }) => {
  return (
    <div className={`task-card ${task.status}` + (task.dueDate ? '' : ' no-due-date')}>
      <div className="task-id">Task #{task.id}</div>
      <div className="task-status">Status: {task.status}</div>
      {task.dueDate && (
        <div className="task-due-date">{formatDueDate(task.dueDate, task.status)}</div>
      )}
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
