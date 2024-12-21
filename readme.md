# TaskManager

TaskManager is a simple task management application that allows users to add, complete, delete, and filter tasks. The tasks are stored in the browser's local storage, ensuring that they persist across sessions.

## Features

- Add new tasks
- Mark tasks as complete or pending
- Delete tasks
- Filter tasks by status (all, completed, pending)
- Tasks are saved in local storage

## Getting Started

### Prerequisites

- A modern web browser (e.g., Chrome, Edge)

### Installation

1. Clone the repository or download the project files.
2. Open the `index.html` file in your web browser.

### Usage

1. Enter a task in the input field and click the "Add Task" button to add a new task.
2. Click the "Mark Complete" button to toggle the task's status between complete and pending.
3. Click the "Delete" button to remove the task.
4. Use the filter dropdown to view tasks based on their status.

## Code Overview

### `js/script.js`

This file contains the main JavaScript code for the application.

- `loadTasks()`: Loads tasks from local storage and displays them.
- `updateLocalStorage(itm)`: Updates the tasks in local storage.
- `addTask()`: Adds a new task to the list and local storage.
- `filterTasks()`: Filters tasks based on their status.

### `index.html`

This file contains the HTML structure of the application.

### `css/styles.css`

This file contains the CSS styles for the application.

## License

This project is licensed under the MIT License.