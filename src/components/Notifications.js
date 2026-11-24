import React, { useEffect, useRef, useState } from 'react';
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification
} from '../api/notifications';
import './Notifications.css';

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString();
}

const BellIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 16v-5a6 6 0 10-12 0v5a2 2 0 01-2 2h16a2 2 0 01-2-2z" fill={filled ? '#1976d2' : 'none'} />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

function Notifications() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef();

  useEffect(() => {
    setNotifications(fetchNotifications());
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Refresh notifications when dropdown opens
  useEffect(() => {
    if (open) setNotifications(fetchNotifications());
  }, [open]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = id => {
    markNotificationAsRead(id);
    setNotifications(fetchNotifications());
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
    setNotifications(fetchNotifications());
  };

  const handleDelete = id => {
    deleteNotification(id);
    setNotifications(fetchNotifications());
  };

  return (
    <div className="notifications-bell" ref={dropdownRef}>
      <span onClick={() => setOpen(o => !o)} aria-label="Notifications" tabIndex={0}>
        <BellIcon filled={unreadCount > 0} />
        {unreadCount > 0 && (
          <span className="notifications-count" aria-label={`${unreadCount} unread notifications`}>
            {unreadCount}
          </span>
        )}
      </span>
      {open && (
        <div className="notifications-dropdown">
          <div className="notifications-dropdown-header">
            Notifications
            {unreadCount > 0 && (
              <button className="notifications-action-btn" style={{fontWeight:'bold'}} onClick={handleMarkAllAsRead}>
                Mark all as read
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <div className="notifications-empty">No notifications</div>
          ) : (
            <ul className="notifications-dropdown-list">
              {notifications.slice().reverse().map(n => (
                <li key={n.id} className={n.read ? '' : 'unread'}>
                  <div className="notifications-message">{n.message}</div>
                  <div className="notifications-meta">{timeAgo(n.createdAt)}</div>
                  <div className="notifications-actions">
                    {!n.read && (
                      <button className="notifications-action-btn" onClick={() => handleMarkAsRead(n.id)}>
                        Mark as read
                      </button>
                    )}
                    <button className="notifications-action-btn" onClick={() => handleDelete(n.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="notifications-dropdown-footer">
            <span style={{fontSize:'0.93rem', color:'#888'}}>
              {notifications.length} total
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
