import React, { useState, useEffect, useCallback } from 'react';
import TaskDashboard from './components/TaskDashboard';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import tasksData from './data/tasks';
import { searchTasks } from './api/tasks';
import { getTasks, saveTasks } from './utils/localStorage';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Load tasks from localStorage if present, else from static data
  useEffect(() => {
    const stored = getTasks();
    if (stored && stored.length) {
      setTasks(stored);
    } else {
      setTasks(tasksData);
      saveTasks(tasksData);
    }
  }, []);

  // Real-time filtering as user types
  useEffect(() => {
    let active = true;
    searchTasks(search).then(results => {
      if (active) setFilteredTasks(results);
    });
    return () => {
      active = false;
    };
  }, [search, tasks]);

  // Update localStorage when tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Handler for changing priority
  const handlePriorityChange = useCallback((taskId, newPriority) => {
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === taskId ? { ...t, priority: newPriority } : t
      )
    );
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Task Dashboard</h1>
      <TaskDashboard tasks={filteredTasks} />
      <SearchBar value={search} onChange={setSearch} />
      <TaskList tasks={filteredTasks} onPriorityChange={handlePriorityChange} />
    </div>
  );
}

export default App;
