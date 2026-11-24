// Example task data source
// In a real app, this might come from an API or global state

const tasks = [
  { id: 1, title: 'Design homepage', description: 'Create homepage wireframe', status: 'pending', dueDate: '2024-06-10T23:59:59Z', priority: 'high' },
  { id: 2, title: 'Write docs', description: 'Document API endpoints', status: 'completed', dueDate: '2024-06-08T23:59:59Z', priority: 'medium' },
  { id: 3, title: 'Fix bug #42', description: 'Resolve login issue', status: 'pending', dueDate: '2024-06-01T23:59:59Z', priority: 'high' }, // overdue
  { id: 4, title: 'Update logo', description: 'Replace logo with new branding', status: 'pending', dueDate: '2024-06-20T23:59:59Z', priority: 'low' },
  { id: 5, title: 'Deploy to prod', description: 'Deploy latest release', status: 'completed', dueDate: '2024-06-05T23:59:59Z', priority: 'high' },
];

export default tasks;
