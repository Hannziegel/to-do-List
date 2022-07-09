import './style.css';
import Tasks from './Tasks.js';
import Task from './Task.js';

/* ----------========== INDEX HTML  ==========---------- */

const todoList = new Tasks();
const todoListUL = document.getElementById('todoListUL');
const addItemInput = document.getElementById('addItemInput');
const enterIcon = document.getElementById('enterIcon');
const clearAllCompleted = document.getElementById('clearAllCompleted');

/* ----------========== CREATE HTML ELEMENTS ==========---------- */

// method create individual task HTML

const createTaskHtml = (description, taskIndex) => {
  // create Li container for the task

  const taskLi = document.createElement('li');
  taskLi.classList.add('todoItem');
  taskLi.id = parseFloat(taskIndex) + 1;
  todoListUL.appendChild(taskLi);

  // create checkbox div

  const checkbox = document.createElement('div');
  checkbox.classList.add('checkbox');
  checkbox.classList.add('checkBoxUnchecked');
  checkbox.addEventListener('click', () => {
    todoList.taskDone(taskLi.id);
    localStorage.setItem('data', JSON.stringify(todoList.tasks));

    if (checkbox.classList.contains('checkBoxUnchecked')) {
      checkbox.classList.remove('checkBoxUnchecked');
      checkbox.classList.add('checkBoxChecked');
    } else {
      checkbox.classList.add('checkBoxUnchecked');
      checkbox.classList.remove('checkBoxChecked');
    }
  });

  // create input

  const inputDescription = document.createElement('input');
  inputDescription.classList.add('todoItemInput');
  inputDescription.value = description;

  // change todo
  inputDescription.addEventListener('change', () => {
    todoList.editTask(inputDescription.value, taskLi.id);
    localStorage.setItem('data', JSON.stringify(todoList.tasks));
  });

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

/* ----------========== ADD ITEM ==========---------- */
enterIcon.addEventListener('click', () => {
  createTaskHtml(addItemInput.value, todoList.tasks.length);
  todoList.addTask(new Task(addItemInput.value, false, todoList.tasks.length + 1));
  // Store new collection in Local Storage
  localStorage.setItem('data', JSON.stringify(todoList.tasks));
});

/* ----------========== REMOVE ITEM ==========---------- */

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('dragDots')) {
    todoList.removeTask(event.target.parentElement.id);
    event.target.parentElement.remove();
    localStorage.setItem('data', JSON.stringify(todoList.tasks));
    document.location.reload();
  }
});

/* ----------========== CLEAR ALL COMPLETED ITEM ==========---------- */

clearAllCompleted.addEventListener('click', () => {
  todoList.clearCompleted();
  localStorage.setItem('data', JSON.stringify(todoList.tasks));
  document.location.reload();
});