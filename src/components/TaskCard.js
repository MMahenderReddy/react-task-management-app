import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';

const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

function isOverdue(task) {
  if (!task.dueDate || task.status === 'completed') return false;
  const due = new Date(task.dueDate);
  const now = new Date();
  return due < now;
}

function TaskCard({ task, onPriorityChange, draggable, onDragStart, onDragEnd }) {
  const [editingPriority, setEditingPriority] = useState(false);
  const [priorityValue, setPriorityValue] = useState(task.priority || 'medium');

  const overdue = isOverdue(task);

  function handlePriorityEdit(e) {
    e.stopPropagation();
    setEditingPriority(true);
  }
  function handlePrioritySelect(e) {
    setPriorityValue(e.target.value);
  }
  function handlePrioritySave(e) {
    e.preventDefault();
    setEditingPriority(false);
    if (priorityValue !== task.priority) {
      onPriorityChange(task.id, priorityValue);
    }
  }
  function handlePriorityCancel(e) {
    e.preventDefault();
    setPriorityValue(task.priority || 'medium');
    setEditingPriority(false);
  }

  return (
    <div
      className={
        'task-card' + (overdue && task.status !== 'completed' ? ' overdue' : '')
      }
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="task-card-header">
        <span className="task-title">{task.title}</span>
        {editingPriority ? (
          <form onSubmit={handlePrioritySave} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2em' }}>
            <select
              value={priorityValue}
              onChange={handlePrioritySelect}
              autoFocus
              style={{ fontSize: '0.95em', borderRadius: '999px', padding: '0.1em 0.7em' }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit" style={{ marginLeft: '0.2em', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '999px', fontSize: '0.93em', padding: '0.1em 0.7em', cursor: 'pointer' }}>Save</button>
            <button type="button" onClick={handlePriorityCancel} style={{ marginLeft: '0.2em', background: 'none', color: '#e53935', border: 'none', fontSize: '1em', cursor: 'pointer' }}>✕</button>
          </form>
        ) : (
          <span
            className={
              'priority-badge priority-' + (task.priority || 'medium')
            }
            title={`Priority: ${PRIORITY_LABELS[task.priority || 'medium']}`}
          >
            {PRIORITY_LABELS[task.priority || 'medium']}
          </span>
        )}
        {!editingPriority && (
          <button
            className="edit-priority-btn"
            title="Edit priority"
            onClick={handlePriorityEdit}
            aria-label="Edit priority"
          >
            ✎
          </button>
        )}
      </div>
      {task.description && (
        <div className="task-card-description">{task.description}</div>
      )}
      <div className="task-card-footer">
        <span className={
          'task-due-date' + (overdue && task.status !== 'completed' ? ' overdue' : '')
        }>
          Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
        </span>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
    dueDate: PropTypes.string,
    status: PropTypes.oneOf(['pending', 'completed']).isRequired,
  }).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
};

export default TaskCard;
