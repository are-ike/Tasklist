const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Get Tasks from Local Storage
const getTasks = (task) =>{
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        //create a
        const link = document.createElement("a");
        link.className = 'delete-item secondary-content';
        //add icon
        link.innerHTML = '<i class= "fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

    })
}

//Filter Tasks
const filterTasks = (e) => {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach((task) =>{
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    })
}
//Clear from Local Storage
const clearFromStorage = () => {
    localStorage.clear();
}
//Clear Tasks
const clearTasks = () => {
    while(taskList.firstChild){
        taskList.firstChild.remove()
    }
    clearFromStorage();
}
//Remove from Local Storage
const delFromLS = (taskToBeDeleted) =>{
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.forEach((task, i) => {
        if(task === taskToBeDeleted.textContent){
            tasks.splice(i, 1);
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
    })
}
//Delete Task
const delTask = (e) => {
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are You Sure You Want To Delete This?"))
        e.target.parentElement.parentElement.remove();

        delFromLS(e.target.parentElement.parentElement);
    }
}

//Add to Local Storage
const addToStorage = (task) => {
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Add Task
const addTask = (e) => {
    if(taskInput.value  === ''){
        alert("Add a Task");
    }
    else{
        //create li
        const li = document.createElement("li");
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        //create a
        const link = document.createElement("a");
        link.className = 'delete-item secondary-content';
        //add icon
        link.innerHTML = '<i class= "fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

        addToStorage(taskInput.value);
    
        taskInput.value ='';
    }
    e.preventDefault();  
}
    
    
//load event listeners
const loadEventListeners = () => {
    form.addEventListener('submit', addTask);
    taskList.addEventListener("click", delTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
    document.addEventListener("DOMContentLoaded", getTasks);
}

loadEventListeners();



