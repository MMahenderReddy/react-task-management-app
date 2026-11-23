// Simulate a backend search endpoint for tasks
// Filters tasks by title and description (case-insensitive, partial match)

/**
 * Search tasks by title or description.
 * @param {Array} tasks - Array of task objects.
 * @param {string} query - Search query string.
 * @returns {Array} Filtered tasks.
 */
export function searchTasks(tasks, query) {
  if (!query || !query.trim()) return tasks;
  const q = query.trim().toLowerCase();
  return tasks.filter(task =>
    (task.title && task.title.toLowerCase().includes(q)) ||
    (task.description && task.description.toLowerCase().includes(q))
  );
}
