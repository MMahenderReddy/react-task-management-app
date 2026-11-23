// Example task data source
// In a real app, this might come from an API or global state

const tasks = [
  { id: 1, title: 'Finish project report', description: 'Complete the final report for the project.', status: 'pending', dueDate: '2024-06-10T23:59:59Z', priority: 'Medium' },
  { id: 2, title: 'Team meeting', description: 'Weekly sync with the team.', status: 'completed', dueDate: '2024-06-08T23:59:59Z', priority: 'Low' },
  { id: 3, title: 'Submit invoice', description: 'Send invoice to client.', status: 'pending', dueDate: '2024-06-01T23:59:59Z', priority: 'High' }, // overdue
  { id: 4, title: 'Plan sprint', description: 'Prepare tasks for next sprint.', status: 'pending', dueDate: '2024-06-20T23:59:59Z', priority: 'Medium' },
  { id: 5, title: 'Code review', description: 'Review pull requests.', status: 'completed', dueDate: '2024-06-05T23:59:59Z', priority: 'Low' },
];

export default tasks;
