import React, { useState, useEffect } from 'react';
import TaskDashboard from './components/TaskDashboard';
import SearchBar from './components/SearchBar';
import NewTaskForm from './components/NewTaskForm';
import { getTasks, addTask as addTaskToStorage } from './utils/localStorage';
import NotificationsBell from './components/NotificationsBell';
import { addNotification } from './api/notifications';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Load tasks from localStorage, or fallback to data/tasks.js if empty
    const stored = getTasks();
    if (stored && stored.length > 0) {
      setTasks(stored);
    } else {
      // fallback: import tasksData dynamically to avoid circular deps
      import('./data/tasks').then(module => {
        setTasks(module.default);
      });
    }
  }, []);

  // Filter tasks by search string (case-insensitive, match id or status)
  const filteredTasks = tasks.filter(task => {
    if (!search.trim()) return true;
    const searchLower = search.toLowerCase();
    return (
      (task.id && String(task.id).toLowerCase().includes(searchLower)) ||
      (task.status && task.status.toLowerCase().includes(searchLower))
    );
  });

  const handleAddTask = task => {
    const newTask = addTaskToStorage(task);
    setTasks(prev => [...prev, newTask]);
    addNotification(`Task "${task.title}" was added.`);
  };

  return (
    <div>
      <NotificationsBell />
      <h1 style={{ textAlign: 'center' }}>Task Dashboard</h1>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <NewTaskForm onAdd={handleAddTask} />
      <TaskDashboard tasks={filteredTasks} />
      {/* Other app content */}
    </div>
  );
}

export default App;
