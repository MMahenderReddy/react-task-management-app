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
  // Remove time part for more human-friendly comparison
  const nowMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueMid = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.ceil((dueMid - nowMid) / msPerDay);

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
      {/* Show a list of tasks with human-readable due dates for demonstration */}
      <div style={{ marginTop: '2rem', width: '100%' }}>
        <h3 style={{ textAlign: 'center', color: '#555' }}>Tasks</h3>
        <ul style={{ listStyle: 'none', padding: 0, maxWidth: 400, margin: '0 auto' }}>
          {tasks.map(task => (
            <li key={task.id} style={{
              background: '#fafafa',
              border: '1px solid #eee',
              borderRadius: 6,
              marginBottom: 12,
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: task.status === 'completed' ? '#43a047' : (task.dueDate && new Date(task.dueDate) < new Date() && task.status === 'pending' ? '#e53935' : '#333')
            }}>
              <span>Task #{task.id}</span>
              <span style={{ fontSize: '0.95em', fontWeight: 500 }}>
                {task.dueDate ? getRelativeDueDate(task.dueDate) : 'No due date'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

TaskDashboard.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['pending', 'completed']).isRequired,
      dueDate: PropTypes.string, // ISO string
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

export default TaskDashboard;
