// Example task data source
// In a real app, this might come from an API or global state

const tasks = [
  { id: 1, title: 'Prepare project report', description: 'Compile Q2 results and prepare slides.', priority: 'high', status: 'pending', dueDate: '2024-06-10T23:59:59Z' },
  { id: 2, title: 'Team meeting', description: 'Discuss roadmap and blockers.', priority: 'medium', status: 'completed', dueDate: '2024-06-08T23:59:59Z' },
  { id: 3, title: 'Client feedback', description: 'Review and respond to client feedback.', priority: 'high', status: 'pending', dueDate: '2024-06-01T23:59:59Z' }, // overdue
  { id: 4, title: 'Update documentation', description: 'Revise API docs for new endpoints.', priority: 'low', status: 'pending', dueDate: '2024-06-20T23:59:59Z' },
  { id: 5, title: 'Release v1.2', description: 'Deploy latest bugfixes to production.', priority: 'medium', status: 'completed', dueDate: '2024-06-05T23:59:59Z' },
];

export default tasks;
