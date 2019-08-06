import { ToDoItem } from "./ToDoItem";
import "./ToDoList.css";

export class ToDoList {
    constructor(containerRef) {
        this.containerRef = containerRef;
        this.listContainer;
        this.initList();
    }

    set toDos(todos) {
        this.listContainer.innerHTML = "";
        this._todos = todos.map(todo => new ToDoItem(todo, this.listContainer));
        console.log(this._todos);
    }

    initList() {
        this.listContainer = document.createElement("ul");
        this.containerRef.appendChild(this.listContainer);
    }
}
