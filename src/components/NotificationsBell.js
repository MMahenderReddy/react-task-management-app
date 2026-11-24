import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../api/notifications';
import NotificationsDropdown from './NotificationsDropdown';
import './NotificationsBell.css';

const NotificationsBell = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll for unread count when dropdown is closed
  useEffect(() => {
    let interval;
    function updateUnread() {
      fetchNotifications().then(n => {
        setUnreadCount(n.filter(x => !x.read).length);
      });
    }
    updateUnread();
    if (!dropdownOpen) {
      interval = setInterval(updateUnread, 5000);
    }
    return () => interval && clearInterval(interval);
  }, [dropdownOpen]);

  // When dropdown closes, refresh unread count
  const handleClose = () => {
    setDropdownOpen(false);
    fetchNotifications().then(n => {
      setUnreadCount(n.filter(x => !x.read).length);
    });
  };

  return (
    <div className="notifications-bell-container">
      <button
        className="notifications-bell-btn"
        aria-label="Show notifications"
        onClick={() => setDropdownOpen(open => !open)}
      >
        <span className="bell-icon" role="img" aria-label="Notifications">
          F514
        </span>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount}</span>
        )}
      </button>
      <NotificationsDropdown open={dropdownOpen} onClose={handleClose} />
    </div>
  );
};

export default NotificationsBell;
