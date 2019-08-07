export function getFormTemplate() {
    return `
        <label for='todo'>ToDo:</label>
        <input type='text' name='todo' autocomplete="off" required>
        <input class='submit-button' type='submit' value='Add todo' disabled>
    `;
}
