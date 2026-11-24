import React, { useState, useEffect } from 'react';
import TaskDashboard from './components/TaskDashboard';
import SearchBar from './components/SearchBar';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import { getTasks, addTask as addTaskToStorage, updateTask as updateTaskInStorage } from './utils/localStorage';
import { searchTasks } from './api/searchTasks';

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

  // Real-time filter using backend-like searchTasks API (title/desc)
  const filteredTasks = searchTasks(search, tasks);

  const handleAddTask = task => {
    const newTask = addTaskToStorage(task);
    setTasks(prev => [...prev, newTask]);
  };

  const handlePriorityChange = (taskId, newPriority) => {
    setTasks(prevTasks => {
      const updated = prevTasks.map(task =>
        String(task.id) === String(taskId) ? { ...task, priority: newPriority } : task
      );
      // Persist change
      const changedTask = updated.find(t => String(t.id) === String(taskId));
      if (changedTask) updateTaskInStorage(changedTask);
      return updated;
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Task Dashboard</h1>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <NewTaskForm onAdd={handleAddTask} />
      <TaskDashboard tasks={filteredTasks} />
      <TaskList tasks={filteredTasks} onPriorityChange={handlePriorityChange} />
    </div>
  );
}

export default App;
