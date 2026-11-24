import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

function NewTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !priority || !dueDate || !status) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: new Date(dueDate).toISOString(),
      status,
    });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setStatus('pending');
  };

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      {error && <div className="form-error">{error}</div>}
      <div className="form-group">
        <label htmlFor="task-title">Title<span className="required">*</span></label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="task-description">Description<span className="required">*</span></label>
        <textarea
          id="task-description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="task-priority">Priority<span className="required">*</span></label>
        <select
          id="task-priority"
          value={priority}
          onChange={e => setPriority(e.target.value)}
          required
        >
          {PRIORITY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="task-due-date">Due Date<span className="required">*</span></label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="task-status">Status<span className="required">*</span></label>
        <select
          id="task-status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="add-task-btn">Add Task</button>
    </form>
  );
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;
