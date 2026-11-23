// Example task data source
// In a real app, this might come from an API or global state

const tasks = [
  { id: 1, title: 'Write project proposal', description: 'Draft and submit the initial project proposal.', status: 'pending', dueDate: '2024-06-10T23:59:59Z', priority: 'High' },
  { id: 2, title: 'Review code', description: 'Review the latest PRs and provide feedback.', status: 'completed', dueDate: '2024-06-08T23:59:59Z', priority: 'Medium' },
  { id: 3, title: 'Prepare slides', description: 'Create slides for the upcoming meeting.', status: 'pending', dueDate: '2024-06-01T23:59:59Z', priority: 'Low' }, // overdue
  { id: 4, title: 'Update documentation', description: 'Update the README and API docs.', status: 'pending', dueDate: '2024-06-20T23:59:59Z', priority: 'Medium' },
  { id: 5, title: 'Deploy to staging', description: 'Deploy the latest build to the staging environment.', status: 'completed', dueDate: '2024-06-05T23:59:59Z', priority: 'High' },
];

export default tasks;
