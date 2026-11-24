// Utility functions for task data persistence using Local Storage

const TASKS_KEY = 'tasks';

/**
 * Retrieve all tasks from Local Storage.
 * @returns {Array} Array of task objects.
 */
export function getTasks() {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
}

/**
 * Save all tasks to Local Storage.
 * @param {Array} tasks - Array of task objects to save.
 */
export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

/**
 * Add a new task to Local Storage.
 * @param {Object} task - Task object to add.
 * @returns {Object} The added task (with id).
 */
export function addTask(task) {
  const tasks = getTasks();
  // Assign a unique id if not present
  if (!task.id) {
    task.id = Date.now().toString();
  }
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

/**
 * Update an existing task in Local Storage.
 * @param {Object} updatedTask - Task object with updated data.
 * @returns {boolean} True if update was successful, false otherwise.
 */
export function updateTask(updatedTask) {
  const tasks = getTasks();
  const idx = tasks.findIndex(t => t.id === updatedTask.id);
  if (idx === -1) return false;
  tasks[idx] = { ...tasks[idx], ...updatedTask };
  saveTasks(tasks);
  return true;
}

/**
 * Delete a task from Local Storage by id.
 * @param {string} taskId - The id of the task to delete.
 * @returns {boolean} True if deletion was successful, false otherwise.
 */
export function deleteTask(taskId) {
  const tasks = getTasks();
  const newTasks = tasks.filter(t => t.id !== taskId);
  if (newTasks.length === tasks.length) return false;
  saveTasks(newTasks);
  return true;
}

/**
 * Assign a task to a user and send email notification.
 * @param {Object} task - Task object (must have id, title, project, dueDate, assignedTo)
 * @param {Object} user - User object (must have email, name)
 * @returns {Promise<boolean>} True if assignment and notification succeeded
 */
import { sendEmail } from './email';

export async function assignTask(task, user) {
  // Update the task's assignedTo
  const updatedTask = { ...task, assignedTo: user.email };
  const updated = updateTask(updatedTask);
  if (!updated) return false;

  // Compose email
  const subject = `Task Assigned: ${task.title}`;
  const body = `Hello ${user.name},\n\nYou have been assigned a new task.\n\nTitle: ${task.title}\nProject: ${task.project || 'N/A'}\nDue Date: ${task.dueDate ? new Date(task.dueDate).toLocaleString() : 'N/A'}\n\nPlease check your dashboard for more details.\n\nBest regards,\nTask Management System`;
  await sendEmail(user.email, subject, body);
  return true;
}
