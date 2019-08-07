import "./Form.css";
import { getFormTemplate } from "../core/utils/getFormTemplate.util";

export class CreateTodoForm {
    constructor(containerRef, onAddTodo) {
        this.containerRef = containerRef;
        this.onAddTodo = onAddTodo;
        this.geneRateId = this.createIdGenerator();
    }

    init() {
        this.form = document.createElement("form");
        this.form.classList.add("add-todo-form");
        this.containerRef.appendChild(this.form);
        this.form.innerHTML = getFormTemplate();
        this.form.addEventListener("submit", (e) => this.onSubmit(e));
        this.form.addEventListener("input", () => this.checkSubmitEnabled());
    }

    onSubmit(event) {
        event.preventDefault();

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
        const submitButton = this.form.querySelector("[type='submit']");
        submitButton.setAttribute("disabled", true);
    }

    checkSubmitEnabled() {
        const isValid = this.form.checkValidity();
        const submitButton = this.form.querySelector("[type='submit']");
        if (!isValid) {
            submitButton.setAttribute("disabled", true);
        } else {
            submitButton.removeAttribute("disabled");
        }
    }

    createIdGenerator() {
        let counter = 0;
        return function() {
            return counter++;
        };
    }
}
