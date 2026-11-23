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

function getRelativeDueDate(dueDateStr) {
  if (!dueDateStr) return '';
  const now = new Date();
  const dueDate = new Date(dueDateStr);
  // Remove time for comparison
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil((dueDateOnly - nowDate) / msPerDay);

  if (diffDays > 1) {
    return `Due in ${diffDays} days`;
  } else if (diffDays === 1) {
    return 'Due tomorrow';
  } else if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays === -1) {
    return 'Overdue by 1 day';
  } else {
    return `Overdue by ${Math.abs(diffDays)} days`;
  }
}

const TaskDashboard = ({ tasks }) => {
  const [counts, setCounts] = useState({ total: 0, pending: 0, completed: 0, overdue: 0 });

  useEffect(() => {
    setCounts(getStatusCounts(tasks));
  }, [tasks]);

  // Show up to 3 upcoming or overdue tasks with their due date in human format
  const upcomingTasks = tasks
    .filter(task => task.status === 'pending' && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

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
      <div className="dashboard-card" style={{ minWidth: 180 }}>
        <div className="label" style={{ fontWeight: 'bold', marginBottom: 4 }}>Due Dates</div>
        {upcomingTasks.length === 0 ? (
          <div style={{ color: '#888', fontSize: '0.95rem' }}>No upcoming tasks</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {upcomingTasks.map(task => (
              <li key={task.id} style={{ fontSize: '0.97rem', marginBottom: 2 }}>
                <span style={{ color: '#1976d2', fontWeight: 500 }}>#{task.id}</span>:
                <span style={{ marginLeft: 6 }}>{getRelativeDueDate(task.dueDate)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

TaskDashboard.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['pending', 'completed']).isRequired,
      dueDate: PropTypes.string, // ISO string
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default TaskDashboard;
