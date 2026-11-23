// Example task data source
// In a real app, this might come from an API or global state

const tasks = [
  { id: 1, title: 'Buy groceries', description: 'Milk, Bread, Cheese', status: 'pending', dueDate: '2024-06-10T23:59:59Z', priority: 'medium' },
  { id: 2, title: 'Finish report', description: 'Monthly sales report', status: 'completed', dueDate: '2024-06-08T23:59:59Z', priority: 'high' },
  { id: 3, title: 'Call plumber', description: 'Fix kitchen sink', status: 'pending', dueDate: '2024-06-01T23:59:59Z', priority: 'low' }, // overdue
  { id: 4, title: 'Plan vacation', description: 'Book flights and hotel', status: 'pending', dueDate: '2024-06-20T23:59:59Z', priority: 'medium' },
  { id: 5, title: 'Read book', description: 'Finish reading novel', status: 'completed', dueDate: '2024-06-05T23:59:59Z', priority: 'low' },
];

export default tasks;
