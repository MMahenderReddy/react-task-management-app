// Example task data source
// In a real app, this might come from an API or global state

const tasks = [
  { id: 1, status: 'pending', dueDate: '2024-06-10T23:59:59Z', priority: 'medium', title: 'Prepare project report', description: 'Compile and submit the monthly project report.' },
  { id: 2, status: 'completed', dueDate: '2024-06-08T23:59:59Z', priority: 'high', title: 'Client meeting', description: 'Attend client meeting and discuss requirements.' },
  { id: 3, status: 'pending', dueDate: '2024-06-01T23:59:59Z', priority: 'high', title: 'Fix critical bug', description: 'Resolve the production bug affecting payments.' }, // overdue
  { id: 4, status: 'pending', dueDate: '2024-06-20T23:59:59Z', priority: 'low', title: 'Update documentation', description: 'Revise and update the API documentation.' },
  { id: 5, status: 'completed', dueDate: '2024-06-05T23:59:59Z', priority: 'medium', title: 'Release v1.2', description: 'Deploy version 1.2 to production.' },
];

export default tasks;
