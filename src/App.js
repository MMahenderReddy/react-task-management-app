import React, { useState, useEffect } from 'react';
import TaskDashboard from './components/TaskDashboard';
import SearchBar from './components/SearchBar';
import tasksData from './data/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulate fetching tasks from a data source
    setTasks(tasksData);
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

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Task Dashboard</h1>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <TaskDashboard tasks={filteredTasks} />
      {/* Other app content */}
    </div>
  );
}

export default App;
