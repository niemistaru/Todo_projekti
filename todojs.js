//array for todo-items
let todoItems = [];

//Display todos on screen
function renderTodo(todo) {
    //local storage
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));

    //select first element on to do-list (ul element)
    const list = document.querySelector('.todo-items');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        return
    }

    const isCompleted = todo.completed ? 'done':'';
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isCompleted}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-button">X</button>
    `;
       
    if (item) {
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }

}


//Add todo
function addTodo(text) {
    const todo = {
        text,
        id: Date.now(),
        completed: false,
};
todoItems.push(todo);
renderTodo(todo);
}

//Toggle checked/completed todo
function toggleChecked(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].completed = !todoItems[index].completed;
    renderTodo(todoItems[index]);
}

//Delete todo
function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

//Form: event listener (submit) + validation
const form =document.querySelector('.todo-form');
form.addEventListener('submit', event => {
    //prevent refreshing
    event.preventDefault();
    //select + validate text input
    const input = document.querySelector('.todo-input');
    const text = input.value;   
     if (text == "") {
         alert("Et voi lisätä tyhjää tehtävää, kirjoita jotain.");
         document.getElementById("task").style.borderColor = "red";
         return false;
     } 
    if (text.length < 3 ) {
         alert("Tehtävän pitää olla vähintään 3 merkkiä pitkä");
         document.getElementById("task").style.borderColor = "red";
         return false;
     }
     else {
        document.getElementById("task").style.borderColor = "black";
        addTodo(text);
        input.value = '';
     }
});

//Mark todo as completed or delete a todo
//event listener (click)
const list = document.querySelector('.todo-items');
list.addEventListener('click', event => {
    //mark as checked
    if (event.target.classList.contains('js-tick')){ 
    const itemKey = event.target.parentElement.dataset.key;
    toggleChecked(itemKey);
    }
    //delete todo
    if (event.target.classList.contains('delete-button')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
    }
});

//Display existing todos from local storage when page is loaded
document.addEventListener('DOMContentLoaded', () => {
    const ref =  localStorage.getItem('todoItemsRef');
    if (ref){
       todoItems = JSON.parse(ref);
       todoItems.forEach(t => {
        renderTodo(t);
       }); 
    }
});

