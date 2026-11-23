import React, { useState, useEffect } from 'react';
import TaskDashboard from './components/TaskDashboard';
import tasksData from './data/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulate fetching tasks from a data source
    setTasks(tasksData);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Task Dashboard</h1>
      <TaskDashboard tasks={tasks} />
      {/* Other app content */}
    </div>
  );
}

export default App;
