import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';

function formatTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000); // seconds
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString();
}

const Notifications = ({ notifications, onMarkRead, onMarkAllRead }) => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef();
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        bellRef.current &&
        !bellRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-bell" ref={bellRef}>
      <span
        className={`bell-icon${unreadCount > 0 ? ' unread' : ''}`}
        role="button"
        aria-label="Notifications"
        tabIndex={0}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') setOpen(o => !o);
        }}
      >
        {/* Bell SVG icon */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </span>
      {unreadCount > 0 && (
        <span className="unread-count" aria-label={`${unreadCount} unread notifications`}>
          {unreadCount}
        </span>
      )}
      {open && (
        <div className="notifications-dropdown" ref={dropdownRef}>
          <div className="notifications-dropdown-header">
            <span className="dropdown-title">Notifications</span>
            {unreadCount > 0 && (
              <button className="mark-all-btn" onClick={onMarkAllRead} type="button">
                Mark all as read
              </button>
            )}
          </div>
          <ul className="notifications-list">
            {notifications.length === 0 && (
              <div className="notifications-empty">No notifications</div>
            )}
            {notifications.map(n => (
              <li
                key={n.id}
                className={`notifications-list-item${n.read ? '' : ' unread'}`}
              >
                <div className="notif-content">
                  <div className="notif-title">{n.title}</div>
                  {n.description && <div>{n.description}</div>}
                  <div className="notif-time">{formatTimeAgo(n.createdAt)}</div>
                </div>
                {!n.read && (
                  <button
                    className="mark-read-btn"
                    onClick={() => onMarkRead(n.id)}
                    type="button"
                  >
                    Mark as read
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      read: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onMarkRead: PropTypes.func.isRequired,
  onMarkAllRead: PropTypes.func.isRequired,
};

export default Notifications;
