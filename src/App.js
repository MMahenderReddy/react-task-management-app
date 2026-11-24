import React, { useState, useEffect } from 'react';
import TaskDashboard from './components/TaskDashboard';
import SearchBar from './components/SearchBar';
import NewTaskForm from './components/NewTaskForm';
import TaskBoard from './components/TaskBoard';
import TaskDetailModal from './components/TaskDetailModal';
import { getTasks, addTask as addTaskToStorage, updateTask as updateTaskInStorage } from './utils/localStorage';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [editingTask, setEditingTask] = useState(null);

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
  };

  const handleEditTask = task => {
    setEditingTask(task);
  };

  const handleSaveTask = updatedTask => {
    updateTaskInStorage(updatedTask);
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditingTask(null);
  };

  const handleMoveTask = (task, newStatus) => {
    if (task.status === newStatus) return;
    const updatedTask = { ...task, status: newStatus };
    updateTaskInStorage(updatedTask);
    setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Task Dashboard</h1>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <NewTaskForm onAdd={handleAddTask} />
      <TaskDashboard tasks={filteredTasks} />
      <TaskBoard
        tasks={filteredTasks}
        onEditTask={handleEditTask}
        onMoveTask={handleMoveTask}
      />
      {editingTask && (
        <TaskDetailModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}

export default App;
