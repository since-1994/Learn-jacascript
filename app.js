
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions =document.querySelector('.filter-todo');
const TODOS =  'todos';

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', checkDelete);
filterOptions.addEventListener('change', filterTodo);

function filterTodo(e){
    const todos = todoList.children;
    console.log(todos);
   todos.forEach(function(todo){
       switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("todo-item--complete")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(todo.classList.contains("todo-item--complete")){
                    todo.style.display = "none";
                }else{
                    todo.style.display = "flex";
                }
                break;
       }
   });
}

function addTodo(event){
    //Preven form from submitting
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    saveTodos(todoInput.value);
    todoInput.value = "";
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class ="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class ="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}

function checkDelete(event){
    const item = event.target;
    const target = item.parentElement;
    
    if(item.classList[0] === 'trash-btn'){
        target.classList.add('fall');
        removeTodos(target.children[0].innerText);
        target.addEventListener('transitionend', function(){
            target.remove();
        })
    }else if(item.classList[0] === 'complete-btn'){
       target.classList.toggle('todo-item--complete');
       console.log(target);    
    }
}

function saveTodos(todo){
    let todos = JSON.parse(localStorage.getItem(TODOS));

    if(todos === null){
        todos = [];
        todos.push(todo);
    }else{
        todos.push(todo);
    }

    localStorage.setItem(TODOS, JSON.stringify(todos));
}

function getTodos(){
    let todos = JSON.parse(localStorage.getItem(TODOS));

    if(todos != null){
        todos.forEach(function(todo){
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo')
        
            const newTodo = document.createElement('li');
            newTodo.innerText = todo;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);
        
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class ="fas fa-check"></i>'
            completedButton.classList.add('complete-btn')
            todoDiv.appendChild(completedButton);
        
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class ="fas fa-trash"></i>'
            trashButton.classList.add('trash-btn')
            todoDiv.appendChild(trashButton);
        
            todoList.appendChild(todoDiv);        
        })
    }

}

function removeTodos(todo){
    let todos = JSON.parse(localStorage.getItem(TODOS));

    if(todos != null){
        const targetIdx = todos.indexOf(todo);
        todos.splice(targetIdx, 1);
    }

    localStorage.setItem(TODOS, JSON.stringify(todos));
}