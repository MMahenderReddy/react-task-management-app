import React, { useEffect, useRef, useState } from 'react';
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from '../api/notifications';
import './NotificationsDropdown.css';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

const NotificationsDropdown = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchNotifications().then(n => {
        setNotifications(n);
        setLoading(false);
      });
    }
  }, [open]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  const handleMarkRead = id => {
    markNotificationRead(id).then(() => {
      setNotifications(notifications =>
        notifications.map(n => (n.id === id ? { ...n, read: true } : n))
      );
    });
  };

  const handleDelete = id => {
    deleteNotification(id).then(() => {
      setNotifications(notifications => notifications.filter(n => n.id !== id));
    });
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead().then(() => {
      setNotifications(notifications => notifications.map(n => ({ ...n, read: true })));
    });
  };

  return (
    <div
      className={`notifications-dropdown${open ? ' open' : ''}`}
      ref={dropdownRef}
      tabIndex={-1}
    >
      <div className="dropdown-header">
        <span>Notifications</span>
        <button
          className="mark-all-read-btn"
          onClick={handleMarkAllRead}
          disabled={notifications.every(n => n.read)}
        >
          Mark all as read
        </button>
      </div>
      {loading ? (
        <div className="dropdown-loading">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="dropdown-empty">No notifications</div>
      ) : (
        <ul className="dropdown-list">
          {notifications.map(n => (
            <li
              key={n.id}
              className={`dropdown-item${n.read ? ' read' : ' unread'}`}
            >
              <div className="item-message">{n.message}</div>
              <div className="item-meta">
                <span className="item-date">{formatDate(n.createdAt)}</span>
                {!n.read && (
                  <button
                    className="item-action mark-read"
                    title="Mark as read"
                    onClick={() => handleMarkRead(n.id)}
                  >
                    ✓
                  </button>
                )}
                <button
                  className="item-action delete"
                  title="Delete notification"
                  onClick={() => handleDelete(n.id)}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsDropdown;
