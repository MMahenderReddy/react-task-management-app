import tasksData from '../data/tasks';

/**
 * Simulate searching tasks by title and description (case-insensitive, substring match).
 * @param {string} query
 * @returns {Promise<Array>} Filtered tasks
 */
export function searchTasks(query) {
  return new Promise(resolve => {
    const q = query.trim().toLowerCase();
    if (!q) {
      resolve([...tasksData]);
      return;
    }
    const filtered = tasksData.filter(task =>
      (task.title && task.title.toLowerCase().includes(q)) ||
      (task.description && task.description.toLowerCase().includes(q))
    );
    resolve(filtered);
  });
}

/**
 * Simulate updating a task's priority.
 * @param {number|string} taskId
 * @param {string} newPriority
 * @returns {Promise<boolean>} Success
 */
export function updateTaskPriority(taskId, newPriority) {
  return new Promise(resolve => {
    const idx = tasksData.findIndex(t => t.id === taskId);
    if (idx === -1) {
      resolve(false);
      return;
    }
    tasksData[idx].priority = newPriority;
    resolve(true);
  });
}
