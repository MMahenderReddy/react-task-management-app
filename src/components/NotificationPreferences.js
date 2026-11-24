import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getNotificationPreferences, updateNotificationPreferences } from '../api/notificationPreferences';
import './NotificationPreferences.css';

const EVENT_TYPES = [
  {
    key: 'dueDateReminders',
    label: 'Due Date Reminders',
    description: 'Get notified before a task is due.'
  },
  {
    key: 'taskCompleted',
    label: 'Task Completed',
    description: 'Get notified when a task is marked as completed.'
  },
  {
    key: 'newTaskAssigned',
    label: 'New Task Assigned',
    description: 'Get notified when a new task is assigned to you.'
  }
];

function NotificationPreferences({ userId }) {
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    getNotificationPreferences(userId)
      .then(prefs => {
        setPreferences(prefs);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load preferences.');
        setLoading(false);
      });
  }, [userId]);

  const handleToggle = (key) => {
    if (!preferences) return;
    const updated = { ...preferences, [key]: !preferences[key] };
    setPreferences(updated);
    setSaving(true);
    setError('');
    setSuccess(false);
    updateNotificationPreferences(userId, updated)
      .then(() => {
        setSaving(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1200);
      })
      .catch(() => {
        setError('Failed to save preferences.');
        setSaving(false);
      });
  };

  if (loading) return <div className="notif-prefs-container">Loading preferences...</div>;
  if (error) return <div className="notif-prefs-container error">{error}</div>;
  if (!preferences) return null;

  return (
    <div className="notif-prefs-container">
      <h2>Notification Preferences</h2>
      <div className="notif-prefs-list">
        {EVENT_TYPES.map(evt => (
          <div className="notif-prefs-item" key={evt.key}>
            <div className="notif-prefs-labels">
              <label htmlFor={`notif-toggle-${evt.key}`}>{evt.label}</label>
              <span className="notif-prefs-desc">{evt.description}</span>
            </div>
            <label className="switch">
              <input
                id={`notif-toggle-${evt.key}`}
                type="checkbox"
                checked={!!preferences[evt.key]}
                onChange={() => handleToggle(evt.key)}
                disabled={saving}
              />
              <span className="slider round"></span>
            </label>
          </div>
        ))}
      </div>
      {saving && <div className="notif-prefs-status">Saving...</div>}
      {success && <div className="notif-prefs-status success">Preferences saved!</div>}
      {error && <div className="notif-prefs-status error">{error}</div>}
    </div>
  );
}

NotificationPreferences.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default NotificationPreferences;
