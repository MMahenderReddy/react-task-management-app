import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskDetailModal.css';

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

function TaskDetailModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'medium');
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.slice(0, 10) : '');
  const [status, setStatus] = useState(task.status || 'pending');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !priority || !dueDate || !status) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSave({
      ...task,
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: new Date(dueDate).toISOString(),
      status,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>Edit Task</h2>
        {error && <div className="modal-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label htmlFor="modal-title">Title</label>
            <input
              id="modal-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="modal-form-group">
            <label htmlFor="modal-desc">Description</label>
            <textarea
              id="modal-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="modal-form-group">
            <label htmlFor="modal-priority">Priority</label>
            <select
              id="modal-priority"
              value={priority}
              onChange={e => setPriority(e.target.value)}
              required
            >
              {PRIORITY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="modal-form-group">
            <label htmlFor="modal-due-date">Due Date</label>
            <input
              id="modal-due-date"
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="modal-form-group">
            <label htmlFor="modal-status">Status</label>
            <select
              id="modal-status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="modal-save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

TaskDetailModal.propTypes = {
  task: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TaskDetailModal;
