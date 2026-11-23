import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TaskDashboard.css';

function getStatusCounts(tasks) {
  const now = new Date();
  let total = tasks.length;
  let pending = 0;
  let completed = 0;
  let overdue = 0;

  tasks.forEach(task => {
    if (task.status === 'completed') {
      completed++;
    } else if (task.status === 'pending') {
      pending++;
      if (task.dueDate && new Date(task.dueDate) < now) {
        overdue++;
      }
    }
  });

  return { total, pending, completed, overdue };
}

const TaskDashboard = ({ tasks }) => {
  const [counts, setCounts] = useState({ total: 0, pending: 0, completed: 0, overdue: 0 });

  useEffect(() => {
    setCounts(getStatusCounts(tasks));
  }, [tasks]);

  return (
    <div className="task-dashboard">
      <div className="dashboard-card total">
        <div className="count">{counts.total}</div>
        <div className="label">Total Tasks</div>
      </div>
      <div className="dashboard-card pending">
        <div className="count">{counts.pending}</div>
        <div className="label">Pending</div>
      </div>
      <div className="dashboard-card completed">
        <div className="count">{counts.completed}</div>
        <div className="label">Completed</div>
      </div>
      <div className="dashboard-card overdue">
        <div className="count">{counts.overdue}</div>
        <div className="label">Overdue</div>
      </div>
    </div>
  );
};

TaskDashboard.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['pending', 'completed']).isRequired,
      dueDate: PropTypes.string, // ISO string
    })
  ).isRequired,
};

export default TaskDashboard;
