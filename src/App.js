import React, { useState, useEffect } from 'react';
import TaskDashboard from './components/TaskDashboard';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import tasksData from './data/tasks';
import { searchTasks } from './utils/searchTasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulate fetching tasks from a data source
    setTasks(tasksData);
  }, []);

  // Real-time filtering of tasks as user types
  const filteredTasks = searchTasks(tasks, search);

  // Handle priority change
  const handlePriorityChange = (taskId, newPriority) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      )
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Task Dashboard</h1>
      <TaskDashboard tasks={tasks} />
      <SearchBar value={search} onChange={setSearch} />
      <TaskList tasks={filteredTasks} onPriorityChange={handlePriorityChange} />
    </div>
  );
}

export default App;
