import React, { useState, useEffect } from 'react';
import TaskDashboard from './components/TaskDashboard';
import SearchBar from './components/SearchBar';
import TaskList from './components/TaskList';
import { searchTasks, updateTaskPriority } from './api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch tasks (filtered by search)
  useEffect(() => {
    let active = true;
    setLoading(true);
    searchTasks(search).then(results => {
      if (active) {
        setTasks(results);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [search]);

  // Real-time filtering as user types
  const handleSearchChange = value => {
    setSearch(value);
  };

  // Handle priority change
  const handlePriorityChange = (taskId, newPriority) => {
    updateTaskPriority(taskId, newPriority).then(success => {
      if (success) {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId ? { ...task, priority: newPriority } : task
          )
        );
      }
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Task Dashboard</h1>
      <TaskDashboard tasks={tasks} />
      <SearchBar value={search} onChange={handleSearchChange} />
      {loading ? (
        <div style={{ textAlign: 'center', margin: '2rem' }}>Loading...</div>
      ) : (
        <TaskList tasks={tasks} onPriorityChange={handlePriorityChange} />
      )}
    </div>
  );
}

export default App;
