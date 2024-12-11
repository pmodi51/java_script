const addButton = document.getElementById("add-task");
const newTaskInput = document.getElementById("new-task");
const todoList = document.getElementById("todo-list");
let taskValue = '';

document.addEventListener("DOMContentLoaded", loadTasks);


newTaskInput.addEventListener('change', function (e) {
  taskValue = e.target.value;
});

addButton.addEventListener("click", function(){
  const taskText = newTaskInput;
  console.log(taskText)
  
  if(taskText !== ""){
    addTask(taskValue);
    taskText.value = '';
    taskValue = "";
    saveTasks();
  }
});


function addTask(taskText){
  const li = document.createElement("li");
  li.textContent = taskText;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Delete";
  removeButton.classList.add("remove");
  removeButton.addEventListener("click", function(){
    li.remove();
    saveTasks();
  });
  li.appendChild(removeButton);
  todoList.appendChild(li);
}

function saveTasks(){
  const tasks =  [];
  const taskItem = todoList.getElementsByTagName("li");

  for(let item of taskItem){
    tasks.push(item.textContent.replace("Delete", "").trim());
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(function(task){
    addTask(task);
  });
}