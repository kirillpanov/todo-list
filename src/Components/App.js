import "./App.css";
import { CreateTodoForm } from "./Form";
import { ToDoList } from "./ToDoList";
import { CUSTOM_EVENTS } from "../core/constants/customEvents";

export class App {
    constructor() {
        this.todos = [];
        this.form;
        this.container;
        this.todoList;
    }

    init() {
        this.container = document.createElement("div");
        this.container.classList.add("main-container");
        // document.body.appendChild(container);
        document.body.insertBefore(this.container, document.body.firstChild);

        window.addEventListener(CUSTOM_EVENTS.TOGGLE_FULFILL_TODO, (event) => this.onFulfillToggle(event));

        this.initForm();
        this.initTodoList();
    }

    initForm() {
        this.form = new CreateTodoForm(this.container, (todo) => this.onAddTodo(todo));
        this.form.init();
    }

    initTodoList() {
        this.todoList = new ToDoList(this.container);
        this.todoList.toDos = this.todos;
    }

    onAddTodo(todo) {
        this.todos.push(todo);
        this.todoList.toDos = [...this.todos];
    }

    onFulfillToggle(event) {
        this.todos = this.todos.map((todo) => {
            let newTodo = todo;

            if (newTodo.id === event.detail.todoId) {
                newTodo = Object.assign({}, newTodo, {
                    fulfilled: !newTodo.fulfilled
                });
            }

            return newTodo;
        });
        this.todoList.toDos = this.todos;
    }
}
