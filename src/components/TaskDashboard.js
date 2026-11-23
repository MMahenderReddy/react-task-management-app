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

// Helper to get human-friendly due date string
function getRelativeDueDate(dueDateStr) {
  if (!dueDateStr) return '';
  const now = new Date();
  const dueDate = new Date(dueDateStr);
  // Remove time for comparison
  const nowMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueMid = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.round((dueMid - nowMid) / msPerDay);

  if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays > 0) {
    return `Due in ${diffDays} day${diffDays === 1 ? '' : 's'}`;
  } else {
    return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'}`;
  }
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
      {/* Show a sample of due date formatting for demonstration */}
      {tasks.length > 0 && (
        <div style={{ marginTop: '2rem', width: '100%' }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#888' }}>Due Dates (Sample):</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tasks.slice(0, 3).map(task => (
              <li key={task.id} style={{ fontSize: '0.97rem', color: '#444', marginBottom: '0.2rem' }}>
                Task #{task.id}: {getRelativeDueDate(task.dueDate)}
              </li>
            ))}
          </ul>
        </div>
      )}
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
