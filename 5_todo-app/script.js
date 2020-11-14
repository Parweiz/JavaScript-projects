const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

// Grabs all todo objects that exists in the storage 
const todos = JSON.parse(localStorage.getItem("todos"));
console.log(todos)

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo(todo) {
    // Pass the value of the inputfield on
    let todoText = input.value;
  
    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement("li");
        // If an object // task is completed (grey on the UI), then add it on to the li element
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        console.log(todoText)
        todoEl.innerText = todoText;

        // If any of the objects / tasks is pressed, then toggle the object to completed
        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");

            updateLocalStorage();
        });

        // The one who makes sure that an object / a task can be removed
        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();
            updateLocalStorage();
        });

        todosUL.appendChild(todoEl);
        input.value = "";
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const todosEl = document.querySelectorAll("li");
 
    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    console.log(todosEl)

    localStorage.setItem("todos", JSON.stringify(todos));
}
