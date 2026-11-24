// Backend-like API endpoint for searching tasks by title and description
// This is a mock implementation using in-memory data for demo purposes

/**
 * Search tasks by title and description (case-insensitive substring match).
 * @param {string} query - The search query string.
 * @param {Array} [tasksSource] - Optional array of task objects to search in.
 * @returns {Array} Array of matching task objects.
 */
export function searchTasks(query, tasksSource) {
  let tasks = tasksSource;
  if (!tasks) {
    // fallback: require default tasks
    tasks = require('../data/tasks').default;
  }
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return tasks;
  }
  const q = query.trim().toLowerCase();
  return tasks.filter(task => {
    const title = (task.title || '').toLowerCase();
    const description = (task.description || '').toLowerCase();
    return title.includes(q) || description.includes(q);
  });
}
