import React from 'react';
import PropTypes from 'prop-types';
import './TaskBoard.css';

const PRIORITY_LABELS = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

function PriorityBadge({ priority }) {
  let className = 'priority-badge ';
  if (priority === 'high') className += 'priority-high';
  else if (priority === 'medium') className += 'priority-medium';
  else className += 'priority-low';
  return (
    <span className={className} title={`Priority: ${PRIORITY_LABELS[priority] || priority}`}>{PRIORITY_LABELS[priority] || priority}</span>
  );
}

PriorityBadge.propTypes = {
  priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
};

function TaskCard({ task }) {
  return (
    <div className="task-card">
      <div className="task-title">{task.title || `Task #${task.id}`}</div>
      {task.description && <div className="task-desc">{task.description}</div>}
      <div className="task-meta">
        <PriorityBadge priority={task.priority || 'medium'} />
        <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</span>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.oneOf(['high', 'medium', 'low']),
    dueDate: PropTypes.string,
  }).isRequired,
};

function TaskBoard({ tasks }) {
  // Group tasks by status
  const columns = [
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="task-board">
      {columns.map(col => (
        <div className="board-column" key={col.key}>
          <div className="board-column-title">{col.label}</div>
          {tasks.filter(t => t.status === col.key).length === 0 ? (
            <div style={{ color: '#aaa', textAlign: 'center', fontSize: '0.97rem' }}>No tasks</div>
          ) : (
            tasks.filter(t => t.status === col.key).map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      ))}
    </div>
  );
}

TaskBoard.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string,
      priority: PropTypes.oneOf(['high', 'medium', 'low']),
      dueDate: PropTypes.string,
      status: PropTypes.oneOf(['pending', 'completed']),
    })
  ).isRequired,
};

export default TaskBoard;
