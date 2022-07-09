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
  editTask = (newDescription, index) => {
    index = index -1;
    this.tasks[index].description = newDescription;
  };

  // task Done
  taskDone = (index) => {
    index = index-1;
    console.log('Not changed ', this.tasks[index].completed, typeof this.tasks[index].completed)
    let bool = this.tasks[index].completed;
    bool = !bool;
    this.tasks[index].completed = bool;
    console.log('Changed to', this.tasks[index].completed)
  };

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