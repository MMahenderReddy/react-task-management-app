import React, { useEffect, useState } from 'react';
import { getNotificationPreferences, saveNotificationPreferences, getCurrentUserId } from '../api/notificationPreferences';
import './NotificationPreferences.css';

const EVENT_TYPES = [
  { key: 'task_due', label: 'Task Due' },
  { key: 'task_completed', label: 'Task Completed' },
  { key: 'task_overdue', label: 'Task Overdue' },
  { key: 'new_task', label: 'New Task Assigned' },
];

const DEFAULT_PREFS = {
  task_due: true,
  task_completed: true,
  task_overdue: true,
  new_task: false,
};

function NotificationPreferences() {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const userId = getCurrentUserId();

  useEffect(() => {
    setLoading(true);
    getNotificationPreferences(userId)
      .then(data => {
        setPrefs({ ...DEFAULT_PREFS, ...data });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load preferences.');
        setLoading(false);
      });
  }, [userId]);

  const handleToggle = key => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    setSuccess(false);
    setError('');
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await saveNotificationPreferences(userId, prefs);
      setSuccess(true);
    } catch (err) {
      setError('Failed to save preferences.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="notification-prefs-container">
      <h2>Notification Preferences</h2>
      {loading ? (
        <div className="np-loading">Loading...</div>
      ) : (
        <form onSubmit={handleSave} className="notification-prefs-form">
          {EVENT_TYPES.map(evt => (
            <div className="np-toggle-row" key={evt.key}>
              <label className="np-label" htmlFor={`np-toggle-${evt.key}`}>{evt.label}</label>
              <label className="np-switch">
                <input
                  id={`np-toggle-${evt.key}`}
                  type="checkbox"
                  checked={!!prefs[evt.key]}
                  onChange={() => handleToggle(evt.key)}
                  disabled={saving}
                />
                <span className="np-slider" />
              </label>
            </div>
          ))}
          <button type="submit" className="np-save-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
          {error && <div className="np-error">{error}</div>}
          {success && <div className="np-success">Preferences saved!</div>}
        </form>
      )}
    </div>
  );
}

export default NotificationPreferences;
