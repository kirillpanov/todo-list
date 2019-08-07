import "./ToDoItem.css";

export class ToDoItem {
    constructor(todoItem, listContainerRef) {
        this.id = todoItem.id;
        this.todo = todoItem.todo;
        this.listContainerRef = listContainerRef;
        this.fulfilled = todoItem.fulfilled;
        this.init();
    }

    init() {
        const item = document.createElement("li");
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");

        if (this.fulfilled) {
            checkBox.setAttribute("checked", true);
            item.classList.add("fulfilled");
        } else {
            item.classList.remove("fulfilled");
        }

        const itemText = document.createElement("span");
        itemText.textContent = this.todo;
        item.classList.add("todo-item");
        item.setAttribute("data-id", this.id);
        item.appendChild(checkBox);
        item.appendChild(itemText);
        this.listContainerRef.appendChild(item);
    }
}
