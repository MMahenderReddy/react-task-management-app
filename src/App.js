import React, { useState, useEffect } from 'react';
import TaskDashboard from './components/TaskDashboard';
import TaskList from './components/TaskList';
import tasksData from './data/tasks';
import { getTasks, saveTasks, updateTask } from './utils/localStorage';

function mergeTasksWithLocalStorage(defaultTasks) {
  // If localStorage has tasks, use them; otherwise, use defaultTasks
  const localTasks = getTasks();
  if (localTasks.length > 0) return localTasks;
  // Ensure all tasks have a priority (default to 'medium')
  const withPriority = defaultTasks.map(t => ({ ...t, priority: t.priority || 'medium' }));
  saveTasks(withPriority);
  return withPriority;
}

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage or fallback to tasksData
    setTasks(mergeTasksWithLocalStorage(tasksData));
  }, []);

  const handlePriorityChange = (taskId, newPriority) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      );
      saveTasks(updatedTasks);
      updateTask({ id: taskId, priority: newPriority });
      return updatedTasks;
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Task Dashboard</h1>
      <TaskDashboard tasks={tasks} />
      <TaskList tasks={tasks} onPriorityChange={handlePriorityChange} />
      {/* Other app content */}
    </div>
  );
}

export default App;
