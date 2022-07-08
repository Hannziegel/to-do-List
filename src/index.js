/* tslint:disable:max-classes-per-file */

import './style.css';

/* ----------========== JAVASCRIPT ELEMENTS CLASSES ==========---------- */
class Tasks {
  constructor() {
    this.tasks = [];
  }

  // Add task to (called in UI by - addItem input)
  addTask = (task) => this.tasks.push(task);
}

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.idex = index;
  }
}

/* ----------========== INDEX HTML  ==========---------- */

const todoList = new Tasks();
const todoListUL = document.getElementById('todoListUL');

/* ----------========== CREATE HTML ELEMENTS ==========---------- */

// method create individual task HTML

const createTaskHtml = (description, taskIndex) => {
  // create Li container for the task

  const taskLi = document.createElement('li');
  taskLi.classList.add('todoItem');
  todoListUL.appendChild(taskLi);

  // create checkbox div

  const checkbox = document.createElement('div');
  checkbox.classList.add('checkbox');
  checkbox.id = taskIndex;

  // create input

  const inputDescription = document.createElement('input');
  inputDescription.classList.add('todoItemInput');
  inputDescription.value = description;

  // create dots
  const dotsIconDiv = document.createElement('div');
  dotsIconDiv.classList.add('dragDots');

  // append
  taskLi.append(checkbox, inputDescription, dotsIconDiv);
};

// method that create in the html
const createTasksListHTML = () => {
  todoList.tasks.forEach((e, index) => {
    createTaskHtml(e.description, index);
  });
};

/* ----------========== WHEN PAGE IS LOAD PAGE GET LOCALSTORAGE ==========---------- */
// When page loads, populate html based on localstorage array
// Check if there is data stored

if (localStorage.getItem('data') !== null) {
  todoList.tasks = JSON.parse(localStorage.getItem('data'));
  createTasksListHTML();
} else {
  todoList.tasks = [];
}

// create element in todo list
/* const addTasktoTodoList = new Task(inputDescription.value, false, checkbox.id);
todoList.addTask(addTasktoTodoList); */

/* ----------========== ADD ITEM ==========---------- */

const addItemInput = document.getElementById('addItemInput');
const enterIcon = document.getElementById('enterIcon');

enterIcon.addEventListener('click', () => {
  createTaskHtml(addItemInput.value, todoList.tasks.length);
  todoList.addTask(new Task(addItemInput.value, false, todoList.tasks.length));
  // Store new collection in Local Storage
  localStorage.setItem('data', JSON.stringify(todoList.tasks));
});
