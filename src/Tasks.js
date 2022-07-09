export default class Tasks {
  constructor() {
    this.tasks = [];
  }

  // Add task to (called in UI by - addItem input)
  addTask = (task) => this.tasks.push(task);

  // Remove task
  removeTask = (taskIndex) => {
    this.tasks = this.tasks.filter((task) => task.index !== parseInt(taskIndex, 10));
    this.tasks.forEach((element, newIndex) => {
      element.index = newIndex + 1;
    });
  };

  // Edit task

  editTask = (newDescription, index) => { this.tasks[index].description = newDescription; };

  // Delete all completed (called in UI by - clear All completed button)
  clearCompleted = () => {
    this.tasks.forEach(() => {
      this.tasks = this.tasks.filter((task) => task.completed !== true);
    });
  };

  // Refresh - delete all tasks (called in UI by - refresh icon)
  refreshAll = () => {
    this.tasks = [];
  };
}