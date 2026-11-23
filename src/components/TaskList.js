import React from 'react';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = ({ tasks, onPriorityChange }) => {
  if (!tasks.length) {
    return <div className="task-list-empty">No tasks found.</div>;
  }
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onPriorityChange={onPriorityChange} />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

export default TaskList;
