// Example task data source
// In a real app, this might come from an API or global state

const tasks = [
  { id: 1, title: 'Write documentation', description: 'Document the new API endpoints', status: 'pending', dueDate: '2024-06-10T23:59:59Z', priority: 'medium' },
  { id: 2, title: 'Code review', description: 'Review PR #42', status: 'completed', dueDate: '2024-06-08T23:59:59Z', priority: 'high' },
  { id: 3, title: 'Fix bug', description: 'Resolve login issue for user #17', status: 'pending', dueDate: '2024-06-01T23:59:59Z', priority: 'high' }, // overdue
  { id: 4, title: 'Design mockups', description: 'Create UI mockups for dashboard', status: 'pending', dueDate: '2024-06-20T23:59:59Z', priority: 'low' },
  { id: 5, title: 'Deploy app', description: 'Deploy latest build to production', status: 'completed', dueDate: '2024-06-05T23:59:59Z', priority: 'medium' },
];

export default tasks;
