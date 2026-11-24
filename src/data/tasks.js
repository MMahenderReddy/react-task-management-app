// Example task data source
// In a real app, this might come from an API or global state

const tasks = [
  { id: 1, title: 'Finish report', description: 'Complete the quarterly report', priority: 'high', status: 'pending', dueDate: '2024-06-10T23:59:59Z' },
  { id: 2, title: 'Team meeting', description: 'Discuss project milestones', priority: 'medium', status: 'completed', dueDate: '2024-06-08T23:59:59Z' },
  { id: 3, title: 'Submit invoice', description: 'Send invoice to client', priority: 'low', status: 'pending', dueDate: '2024-06-01T23:59:59Z' }, // overdue
  { id: 4, title: 'Plan sprint', description: 'Prepare tasks for next sprint', priority: 'medium', status: 'pending', dueDate: '2024-06-20T23:59:59Z' },
  { id: 5, title: 'Review PRs', description: 'Code review for open pull requests', priority: 'high', status: 'completed', dueDate: '2024-06-05T23:59:59Z' },
];

export default tasks;
