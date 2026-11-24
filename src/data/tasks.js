// Example task data source
// In a real app, this might come from an API or global state

const tasks = [
  { id: 1, status: 'pending', dueDate: '2024-06-10T23:59:59Z', priority: 'high', title: 'Prepare project report', description: 'Compile and submit the quarterly project report.' },
  { id: 2, status: 'completed', dueDate: '2024-06-08T23:59:59Z', priority: 'medium', title: 'Team meeting', description: 'Discuss milestones and blockers.' },
  { id: 3, status: 'pending', dueDate: '2024-06-01T23:59:59Z', priority: 'low', title: 'Update documentation', description: 'Revise the API documentation for new endpoints.' }, // overdue
  { id: 4, status: 'pending', dueDate: '2024-06-20T23:59:59Z', priority: 'medium', title: 'Client feedback', description: 'Collect and analyze feedback from client review.' },
  { id: 5, status: 'completed', dueDate: '2024-06-05T23:59:59Z', priority: 'high', title: 'Release v2.0', description: 'Deploy the new version to production.' },
];

export default tasks;
