import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskBoard.css';
import TaskCard from './TaskCard';

const BOARD_COLUMNS = [
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
];

function groupTasksByStatus(tasks) {
  const grouped = { pending: [], completed: [] };
  tasks.forEach(task => {
    if (task.status === 'completed') grouped.completed.push(task);
    else grouped.pending.push(task);
  });
  return grouped;
}

const TaskBoard = ({ tasks, onTaskStatusChange, onTaskPriorityChange }) => {
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  const grouped = groupTasksByStatus(tasks);

  function handleDragStart(taskId) {
    setDraggedTaskId(taskId);
  }
  function handleDragEnd() {
    setDraggedTaskId(null);
    setDragOverCol(null);
  }
  function handleDragOver(colKey, e) {
    e.preventDefault();
    setDragOverCol(colKey);
  }
  function handleDrop(colKey, e) {
    e.preventDefault();
    setDragOverCol(null);
    if (draggedTaskId) {
      const task = tasks.find(t => String(t.id) === String(draggedTaskId));
      if (task && task.status !== colKey) {
        onTaskStatusChange(task.id, colKey);
      }
    }
    setDraggedTaskId(null);
  }

  return (
    <div className="task-board">
      {BOARD_COLUMNS.map(col => (
        <div
          key={col.key}
          className={
            'board-column' + (dragOverCol === col.key ? ' drag-over' : '')
          }
          onDragOver={e => handleDragOver(col.key, e)}
          onDrop={e => handleDrop(col.key, e)}
        >
          <div className="board-column-header">
            {col.label}
            <span className="board-column-badge">
              {grouped[col.key].length}
            </span>
          </div>
          <div className="task-list">
            {grouped[col.key].map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onPriorityChange={onTaskPriorityChange}
                draggable
                onDragStart={() => handleDragStart(task.id)}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

TaskBoard.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTaskStatusChange: PropTypes.func.isRequired,
  onTaskPriorityChange: PropTypes.func.isRequired,
};

export default TaskBoard;
