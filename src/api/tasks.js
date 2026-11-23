// Simulated backend API for searching tasks
import tasksData from '../data/tasks';

/**
 * Search tasks by title or description (case-insensitive substring match).
 * @param {string} query
 * @returns {Promise<Array>} Promise resolving to filtered tasks
 */
export function searchTasks(query) {
  return new Promise(resolve => {
    if (!query || !query.trim()) {
      resolve(tasksData);
      return;
    }
    const q = query.trim().toLowerCase();
    resolve(
      tasksData.filter(
        t =>
          (t.title && t.title.toLowerCase().includes(q)) ||
          (t.description && t.description.toLowerCase().includes(q))
      )
    );
  });
}
