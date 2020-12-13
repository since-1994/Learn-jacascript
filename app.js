
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");


todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', checkDelete);

function addTodo(event){
    //Preven form from submitting
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
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
        target.remove();
    }else if(item.classList[0] === 'complete-btn'){
       target.classList.toggle('todo-item--complete');
       console.log(target);    
    }
}