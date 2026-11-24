import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './TaskBoard.css';

const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const PRIORITY_CLASSES = {
  low: 'priority-low',
  medium: 'priority-medium',
  high: 'priority-high',
};

const STATUS_COLUMNS = [
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Done' },
];

function isOverdue(task) {
  if (task.status === 'completed') return false;
  if (!task.dueDate) return false;
  const due = new Date(task.dueDate);
  const now = new Date();
  return due < now;
}

function TaskBoard({ tasks, onUpdateTask }) {
  const [editingPriorityId, setEditingPriorityId] = useState(null);
  const [priorityDraft, setPriorityDraft] = useState('medium');

  // Drag state
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // Group tasks by status
  const columns = useMemo(() => {
    const grouped = { pending: [], completed: [] };
    tasks.forEach(task => {
      if (task.status === 'completed') grouped.completed.push(task);
      else grouped.pending.push(task);
    });
    return grouped;
  }, [tasks]);

  // For instant badge update
  const columnCounts = {
    pending: columns.pending.length,
    completed: columns.completed.length,
  };

  const handlePriorityEdit = (task) => {
    setEditingPriorityId(task.id);
    setPriorityDraft(task.priority || 'medium');
  };

  const handlePriorityChange = (e, task) => {
    setPriorityDraft(e.target.value);
  };

  const handlePrioritySave = (task) => {
    if (task.priority !== priorityDraft) {
      onUpdateTask({ ...task, priority: priorityDraft });
    }
    setEditingPriorityId(null);
  };

  // Drag-and-drop handlers
  const handleDragStart = (e, task) => {
    setDraggedTaskId(task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, statusKey) => {
    e.preventDefault();
    if (!draggedTaskId) return;
    const task = tasks.find(t => t.id === draggedTaskId);
    if (!task || task.status === statusKey) return;
    onUpdateTask({ ...task, status: statusKey });
    setDraggedTaskId(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  return (
    <div className="task-board">
      {STATUS_COLUMNS.map(col => (
        <div
          className="board-column"
          key={col.key}
          onDragOver={handleDragOver}
          onDrop={e => handleDrop(e, col.key)}
        >
          <div className="board-column-header">
            <span className="board-column-title">{col.label}</span>
            <span className="board-column-badge">{columnCounts[col.key]}</span>
          </div>
          <div className="task-list">
            {columns[col.key].map(task => {
              const overdue = isOverdue(task);
              return (
                <div
                  className={`task-card${overdue && task.status !== 'completed' ? ' overdue' : ''}`}
                  key={task.id}
                  draggable
                  onDragStart={e => handleDragStart(e, task)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="task-title">{task.title || `Task #${task.id}`}</div>
                  <div className="task-desc">{task.description || ''}</div>
                  <div className="task-meta">
                    {editingPriorityId === task.id ? (
                      <>
                        <select
                          className="edit-priority-select"
                          value={priorityDraft}
                          onChange={e => handlePriorityChange(e, task)}
                          autoFocus
                          onBlur={() => handlePrioritySave(task)}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                        <button
                          className="edit-btn"
                          type="button"
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => handlePrioritySave(task)}
                        >
                          ✓
                        </button>
                      </>
                    ) : (
                      <>
                        <span className={`priority-badge ${PRIORITY_CLASSES[task.priority || 'medium']}`}>{PRIORITY_LABELS[task.priority || 'medium']}</span>
                        <button
                          className="edit-btn"
                          type="button"
                          title="Edit priority"
                          onClick={() => handlePriorityEdit(task)}
                        >
                          ✎
                        </button>
                      </>
                    )}
                    <span className="due-date">
                      Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  {overdue && task.status !== 'completed' && (
                    <div className="overdue-text">Overdue</div>
                  )}
                </div>
              );
            })}
          </div>
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
      priority: PropTypes.oneOf(['low', 'medium', 'high']),
      dueDate: PropTypes.string,
      status: PropTypes.oneOf(['pending', 'completed']),
    })
  ).isRequired,
  onUpdateTask: PropTypes.func.isRequired,
};

export default TaskBoard;
