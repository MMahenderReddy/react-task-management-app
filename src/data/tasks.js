// Example task data source
// In a real app, this might come from an API or global state

const tasks = [
  { id: 1, status: 'pending', dueDate: '2024-06-10T23:59:59Z' },
  { id: 2, status: 'completed', dueDate: '2024-06-08T23:59:59Z' },
  { id: 3, status: 'pending', dueDate: '2024-06-01T23:59:59Z' }, // overdue
  { id: 4, status: 'pending', dueDate: '2024-06-20T23:59:59Z' },
  { id: 5, status: 'completed', dueDate: '2024-06-05T23:59:59Z' },
];

export default tasks;
