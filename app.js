const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearButton.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [];
    }
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function addTask(event) {
    if(taskInput.value === '') {
        alert('Add a task!');              
    } else {
        // Add the task to the DOM
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
        // Persist to local storage
        persistTask(taskInput.value);
        event.preventDefault();
        taskInput.value = '';
    }
}

function removeTask(event) {
    if(event.target.parentElement.classList.contains('delete-item')) {
        event.target.parentElement.parentElement.remove();
        removeTaskFromLS(event.target.parentElement.parentElement);
    } 
}

function removeTaskFromLS(element) {
    let tasks;
    if(localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [];
    }
    tasks.forEach((task,index) => {
        if(element.textContent === task) {
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLS();
}

function clearTasksFromLS() {
    localStorage.clear();
}

function filterTasks(event) {
    const text = event.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function persistTask(task) {
    let tasks;
    if(localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [];
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}