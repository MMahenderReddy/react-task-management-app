import React, { useEffect, useState } from 'react';
import './NotificationPreferences.css';

const NOTIFICATION_PREFS_KEY = 'notificationPreferences';

const EVENT_TYPES = [
  { key: 'taskAssigned', label: 'Task Assigned' },
  { key: 'dueSoon', label: 'Due Soon' },
  { key: 'commentAdded', label: 'Comment Added' },
  { key: 'statusChanged', label: 'Status Changed' },
];

function getStoredPreferences() {
  const prefs = localStorage.getItem(NOTIFICATION_PREFS_KEY);
  if (prefs) {
    try {
      return JSON.parse(prefs);
    } catch {
      // fallback to all enabled
    }
  }
  // Default: all enabled
  return EVENT_TYPES.reduce((acc, evt) => {
    acc[evt.key] = true;
    return acc;
  }, {});
}

function savePreferences(prefs) {
  localStorage.setItem(NOTIFICATION_PREFS_KEY, JSON.stringify(prefs));
}

const NotificationPreferences = () => {
  const [prefs, setPrefs] = useState(() => getStoredPreferences());

  useEffect(() => {
    savePreferences(prefs);
  }, [prefs]);

  const handleToggle = key => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="notification-prefs-container">
      <h2>Notification Preferences</h2>
      <div className="prefs-list">
        {EVENT_TYPES.map(evt => (
          <div className="prefs-item" key={evt.key}>
            <span className="prefs-label">{evt.label}</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={!!prefs[evt.key]}
                onChange={() => handleToggle(evt.key)}
                aria-checked={!!prefs[evt.key]}
                aria-label={`Toggle ${evt.label} notifications`}
              />
              <span className="slider round"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPreferences;
