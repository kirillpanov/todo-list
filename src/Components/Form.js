import "./Form.css";

export class CreateTodoForm {
    constructor(containerRef, onAddTodo) {
        this.containerRef = containerRef;
        this.onAddTodo = onAddTodo;
        this.geneRateId = this.createIdGenerator();
        this.changeValidationFunction = event => this.changeValidator(event);
    }

    init() {
        this.form = document.createElement("form");
        this.form.classList.add("add-todo-form");
        this.containerRef.appendChild(this.form);
        this.form.innerHTML = `
            <label for='todo'>ToDo:</label>
            <input type='text' name='todo' required>
            <label for='user'>User:</label>
            <input type='email' name='user' required>
            <input class='submit-button' type='submit' value='Submit'>
        `;
        this.form.addEventListener("submit", e => this.onSubmit(e));
        [...this.form.elements].forEach(element => {
            element.addEventListener("focus", event =>
                this.startChangeValidation(event)
            );
            element.addEventListener("blur", event =>
                this.stopChangeValidation(event)
            );
        });
        this.validationMessage = document.createElement("div");
        this.validationMessage.classList.add("validation-message");
        this.form.appendChild(this.validationMessage);
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(event.target.elements);
        this.form = event.target;
        const formFields = [...this.form.elements];
        const data = formFields.reduce(
            (acc, field) =>
                Object.assign(acc, {
                    [field.name]: field.value,
                    id: this.geneRateId()
                }),
            {}
        );
        this.onAddTodo(data);
        // HTMLFormElement
        this.form.reset();
    }

    startChangeValidation(event) {
        const { top } = event.target.getBoundingClientRect();
        const height = event.target.clientHeight;
        const left = event.target.offsetLeft;
        this.validationMessage.style.top = top + height + "px";
        this.validationMessage.style.left = left + "px";
        this.form.insertBefore(
            this.validationMessage,
            event.target.nextElementSibling
        );
        event.target.addEventListener("input", this.changeValidationFunction);
    }

    stopChangeValidation(event) {
        event.target.removeEventListener(
            "input",
            this.changeValidationFunction
        );
        this.changeValidator(event);
    }

    changeValidator(event) {
        if (event.target.validity.valueMissing) {
            this.validationMessage.classList.add("visible");
            this.validationMessage.textContent = "Required field";
        } else {
            this.validationMessage.classList.remove("visible");
        }
    }

    createIdGenerator() {
        let counter = 0;
        return function() {
            return counter++;
        };
    }
}
