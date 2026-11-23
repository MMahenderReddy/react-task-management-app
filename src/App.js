import React, { useState, useEffect } from 'react';
import TaskDashboard from './components/TaskDashboard';
import TaskCard from './components/TaskCard';
import SearchBar from './components/SearchBar';
import tasksData from './data/tasks';
import { searchTasks } from './api/searchTasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTasks(tasksData);
  }, []);

  // Real-time filtering as user types
  const filteredTasks = search ? searchTasks(search) : tasks;

  // Handler for changing priority
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
      <TaskDashboard tasks={filteredTasks} />
      <SearchBar value={search} onChange={setSearch} />
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} onPriorityChange={handlePriorityChange} />
        ))}
        {filteredTasks.length === 0 && (
          <div style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>
            No tasks found.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
