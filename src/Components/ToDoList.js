import { ToDoItem } from "./ToDoItem";
import { CUSTOM_EVENTS } from "../core/constants/customEvents";
import "./ToDoList.css";

export class ToDoList {
    constructor(containerRef) {
        this._todos = [];
        this.containerRef = containerRef;
        this.listContainer;
        this.initList();
    }

    set toDos(todos) {
        this.listContainer.innerHTML = "";
        this._todos = todos.map((todo) => new ToDoItem(todo, this.listContainer));
    }

    initList() {
        this.listContainer = document.createElement("ul");
        this.containerRef.appendChild(this.listContainer);
        this.listContainer.addEventListener("click", (event) => this.onTodoItemClick(event));
    }

    onTodoItemClick(event) {
        event.preventDefault();

        const listItem = this.getListItem(event.target);
        const todoId = Number(listItem.getAttribute("data-id"));
        const fulfillTodoEvent = new CustomEvent(CUSTOM_EVENTS.TOGGLE_FULFILL_TODO, { detail: { todoId } });

        window.dispatchEvent(fulfillTodoEvent);
    }

    getListItem(element) {
        let currentElement = element;

        while (!currentElement.hasAttribute("data-id") && currentElement.tagName !== "LI") {
            currentElement = currentElement.parentNode;
        }

        return currentElement;
    }
}
