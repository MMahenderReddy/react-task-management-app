// Simulated backend search endpoint for tasks
import tasks from '../data/tasks';

/**
 * Search tasks by title or description (case-insensitive, substring match).
 * @param {string} query
 * @returns {Array} Filtered tasks
 */
export function searchTasks(query) {
  if (!query || !query.trim()) return tasks;
  const q = query.trim().toLowerCase();
  return tasks.filter(task =>
    (task.title && task.title.toLowerCase().includes(q)) ||
    (task.description && task.description.toLowerCase().includes(q))
  );
}
