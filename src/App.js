import React, { useState, useEffect, useCallback } from 'react';
import TaskDashboard from './components/TaskDashboard';
import SearchBar from './components/SearchBar';
import tasksData from './data/tasks';
import { searchTasks } from './api/searchTasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  // Debounce search input for real-time filtering
  useEffect(() => {
    let active = true;
    // Simulate async search (could be replaced with real API call)
    const doSearch = () => {
      const results = searchTasks(search);
      if (active) setTasks(results);
    };
    // Debounce: wait 200ms after last keystroke
    const timeout = setTimeout(doSearch, 200);
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [search]);

  // On mount, show all tasks
  useEffect(() => {
    setTasks(tasksData);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Task Dashboard</h1>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <TaskDashboard tasks={tasks} />
      {/* Other app content */}
    </div>
  );
}

export default App;
