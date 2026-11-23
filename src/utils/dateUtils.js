// Utility for formatting due dates in human-readable form

/**
 * Returns a human-readable string for the due date relative to now.
 * @param {string} dueDateISO - ISO string of due date
 * @returns {string}
 */
export function humanReadableDueDate(dueDateISO) {
  if (!dueDateISO) return '';
  const now = new Date();
  const due = new Date(dueDateISO);
  const diffMs = due - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs < 0) {
    // Overdue
    const overdueDays = Math.abs(diffDays);
    return overdueDays === 0 ? 'Overdue today' : `Overdue by ${overdueDays} day${overdueDays > 1 ? 's' : ''}`;
  }
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due in 1 day';
  return `Due in ${diffDays} days`;
}
