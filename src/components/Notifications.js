import React, { useState, useEffect, useRef } from 'react';
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  getUnreadCount
} from '../api/notifications';
import './Notifications.css';

function formatTimeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // seconds
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString();
}

const Notifications = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef();

  const refresh = () => {
    setNotifications(getNotifications());
    setUnreadCount(getUnreadCount());
  };

  useEffect(() => {
    refresh();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const handleBellClick = () => {
    setDropdownOpen(v => !v);
    if (!dropdownOpen) {
      refresh();
    }
  };

  const handleMarkRead = id => {
    markNotificationRead(id);
    refresh();
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    refresh();
  };

  const handleDelete = id => {
    deleteNotification(id);
    refresh();
  };

  return (
    <div className="notifications-bell" ref={dropdownRef}>
      <span
        className="bell-icon"
        role="button"
        aria-label="Notifications"
        tabIndex={0}
        onClick={handleBellClick}
        onKeyDown={e => (e.key === 'Enter' ? handleBellClick() : undefined)}
      >
        F514
      </span>
      {unreadCount > 0 && (
        <span className="unread-count" aria-label={`${unreadCount} unread notifications`}>
          {unreadCount}
        </span>
      )}
      {dropdownOpen && (
        <div className="notifications-dropdown">
          <div className="dropdown-header">
            Notifications
            {notifications.some(n => !n.read) && (
              <button className="mark-all-btn" onClick={handleMarkAllRead}>
                Mark all as read
              </button>
            )}
          </div>
          <ul className="notification-list">
            {notifications.length === 0 && (
              <li className="empty">No notifications</li>
            )}
            {notifications.map(n => (
              <li
                key={n.id}
                className={`notification-item${n.read ? '' : ' unread'}`}
              >
                <div className="notification-message">{n.message}</div>
                <div className="notification-meta">{formatTimeAgo(n.createdAt)}</div>
                <div className="notification-actions">
                  {!n.read && (
                    <button
                      className="action-btn"
                      onClick={() => handleMarkRead(n.id)}
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    className="action-btn"
                    onClick={() => handleDelete(n.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
