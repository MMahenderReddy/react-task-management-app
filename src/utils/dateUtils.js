// Utility to format due date in human-readable way

function pluralize(num, word) {
  return num === 1 ? word : word + 's';
}

/**
 * Format a due date as a human-friendly string.
 * @param {string} dueDateISO - ISO string of due date
 * @param {string} status - 'pending' or 'completed'
 * @returns {string}
 */
export function formatDueDate(dueDateISO, status) {
  if (!dueDateISO) return '';
  const now = new Date();
  const due = new Date(dueDateISO);
  // Zero out time for day comparison
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round((dueDay - nowDay) / msPerDay);

  if (status === 'completed') {
    if (diffDays === 0) return 'Completed on due date';
    if (diffDays > 0) return `Completed ${diffDays} ${pluralize(diffDays, 'day')} early`;
    return `Completed ${-diffDays} ${pluralize(-diffDays, 'day')} late`;
  }

  if (diffDays > 1) {
    return `Due in ${diffDays} days`;
  } else if (diffDays === 1) {
    return 'Due tomorrow';
  } else if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays === -1) {
    return 'Overdue by 1 day';
  } else {
    return `Overdue by ${-diffDays} days`;
  }
}
