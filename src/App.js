import React, { useState, useEffect } from 'react';
import TaskDashboard from './components/TaskDashboard';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import tasksData from './data/tasks';
import { searchTasks } from './api/searchTasks';
import { getTasks, saveTasks } from './utils/localStorage';

function mergeTasks(local, fallback) {
  // Merge localStorage tasks with fallback (data file), prefer local
  if (!local.length) return fallback;
  // If local tasks exist, use them
  return local;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  // On mount, load tasks from localStorage or fallback
  useEffect(() => {
    const local = getTasks();
    const merged = mergeTasks(local, tasksData);
    setTasks(merged);
  }, []);

  // Persist tasks to localStorage on change
  useEffect(() => {
    if (tasks.length) saveTasks(tasks);
  }, [tasks]);

  // Real-time search filtering (calls backend search endpoint)
  useEffect(() => {
    let active = true;
    (async () => {
      const results = await searchTasks(search);
      // Merge in local priorities/status if present
      const local = getTasks();
      const merged = results.map(task => {
        const localTask = local.find(t => String(t.id) === String(task.id));
        return localTask ? { ...task, ...localTask } : task;
      });
      if (active) setFiltered(merged);
    })();
    return () => { active = false; };
  }, [search, tasks]);

  // Handler for priority change
  const handlePriorityChange = (taskId, newPriority) => {
    setTasks(prev => prev.map(task =>
      String(task.id) === String(taskId)
        ? { ...task, priority: newPriority }
        : task
    ));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Task Dashboard</h1>
      <TaskDashboard tasks={filtered.length ? filtered : tasks} />
      <SearchBar value={search} onChange={setSearch} />
      <TaskList tasks={filtered.length ? filtered : tasks} onPriorityChange={handlePriorityChange} />
    </div>
  );
}

export default App;
