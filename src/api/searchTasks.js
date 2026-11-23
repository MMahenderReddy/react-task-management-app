// Simulated backend search endpoint for tasks
import tasksData from '../data/tasks';

/**
 * Search tasks by title or description (case-insensitive substring match).
 * @param {string} query
 * @returns {Promise<Array>} Matching tasks
 */
export async function searchTasks(query) {
  // Simulate API delay
  await new Promise(res => setTimeout(res, 100));
  if (!query) return tasksData;
  const lower = query.toLowerCase();
  return tasksData.filter(task => {
    const title = (task.title || '').toLowerCase();
    const desc = (task.description || '').toLowerCase();
    return title.includes(lower) || desc.includes(lower);
  });
}
