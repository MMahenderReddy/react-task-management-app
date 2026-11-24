import React from 'react';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';

const TaskList = ({ tasks }) => {
  if (!tasks.length) return <div style={{ textAlign: 'center', color: '#888' }}>No tasks found.</div>;
  return (
    <div>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string,
      priority: PropTypes.string,
      status: PropTypes.string.isRequired,
      dueDate: PropTypes.string,
    })
  ).isRequired,
};

export default TaskList;
