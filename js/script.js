let taskItems = [];

// Load tasks from local storage and display them
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    taskItems = JSON.parse(storedTasks);
    
    taskItems.forEach((task) => {
      const taskElement = $(`
        <li class="${task.status == "complete" ? "completed" : ""}">
          <span>${task.taskName}</span>
          <div>
            <button class="complete-btn">Mark Complete</button>
            <button class="delete-btn">Delete</button>
          </div>
        </li>
      `);

      $("#taskList").append(taskElement.hide().fadeIn());
      $("#newTask").val("");
    });

    if (taskItems.length > 0) {
      $("#noTasksMessage").hide();
    }
  }
}

function updateLocalStorage(tasks) {
  const storage = JSON.stringify(tasks);
  localStorage.setItem("tasks", storage);
}

$(document).ready(() => {
  loadTasks();

  const addTask = () => {
    const taskName = $("#newTask").val().trim();

    if (!taskName) {
      toastr.warning('Task cannot be empty!');
      return;
    }

    const taskElement = $(`
      <li>
        <span>${taskName}</span>
        <div>
          <button class="complete-btn">Mark Complete</button>
          <button class="delete-btn">Delete</button>
        </div>
      </li>
    `);
    
    $("#taskList").append(taskElement.hide().fadeIn());
    $("#newTask").val("");
    taskItems.push({ taskName, status: "pending" });
    updateLocalStorage(taskItems);

    // Hide the "No tasks available" message
    $("#noTasksMessage").hide();
  };

  const filterTasks = () => {
    const filterValue = $("#filterTasks").val();

    $("#taskList li").each(function () {
      const isCompleted = $(this).hasClass("completed");

      if (
        filterValue === "all" ||
        (filterValue === "completed" && isCompleted) ||
        (filterValue === "pending" && !isCompleted)
      ) {
        $(this).fadeIn();
      } else {
        $(this).fadeOut();
      }
    });
  };

  $("#taskList").on("click", ".complete-btn", function () {
    const taskElement = $(this).closest("li");
    const taskName = taskElement.find("span").text();
    taskElement.toggleClass("completed");
    taskItems = taskItems.map(taskItem => (
      taskItem.taskName == taskName ? 
      { ...taskItem, status: taskItem.status == "complete" ? "pending" : "complete" } 
      : taskItem 
    ));
    updateLocalStorage(taskItems);
  });

  $("#taskList").on("click", ".delete-btn", function () {
    const taskElement = $(this).closest("li");
    const taskName = taskElement.find("span").text();
    taskElement.fadeOut(() => taskElement.remove());
    taskItems = taskItems.filter(taskItem => (taskItem.taskName !== taskName));
    updateLocalStorage(taskItems);

    // Show the "No tasks available" message if the task list is empty
    if (taskItems.length === 0) {
      $("#noTasksMessage").show();
    }
  });

  $("#addTaskBtn").on("click", addTask);
  $("#filterTasks").on("change", filterTasks);
});