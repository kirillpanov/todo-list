import "./App.css";
import { CreateTodoForm } from "./Form";
import { ToDoList } from "./ToDoList";

export class App {
    constructor() {
        this.todos = [];
        this.form = undefined;
    }

    init() {
        this.container = document.createElement("div");
        this.container.classList.add("main-container");
        // document.body.appendChild(container);
        document.body.insertBefore(this.container, document.body.firstChild);

        this.initForm();
        this.initTodoList();
    }

    initForm() {
        this.form = new CreateTodoForm(this.container, todo =>
            this.onAddTodo(todo)
        );
        this.form.init();
    }

    initTodoList() {
        this.todoList = new ToDoList(this.container);
        this.todoList.toDos = this.todos;
    }

    onAddTodo(todo) {
        this.todos.push(todo);
        console.log(this.todos);
        this.todoList.toDos = [...this.todos];
    }
}
