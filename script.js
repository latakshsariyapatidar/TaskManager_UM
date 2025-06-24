document.addEventListener("DOMContentLoaded", () => {
  const createBtn = document.getElementById("create_task");

  // CREATE TASK (Only available on index.html)
  if (createBtn) {
    createBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const title = document.getElementById("task_input").value;
      const description = document.getElementById("task_description").value;
      const dueDate = document.getElementById("due_date").value;
      const priority =
        document.getElementById("priority").value === "imp"
          ? "Important"
          : "Not Important";

      if (!title.trim()) {
        alert("Please enter a task title");
        return;
      }

      const task = { title, description, dueDate, priority, completed: false };
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      window.location.href = "/look_tasks.html";
    });
  }

  // DISPLAY & DELETE TASKS (Only on look_tasks.html)
  const taskContainer = document.querySelector(".task_container");
  if (taskContainer) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (tasks.length === 0) {
      taskContainer.innerHTML = "<p>No tasks yet.</p>";
      return;
    }

    taskContainer.innerHTML = ""; // Clear any pre-existing content

    tasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      // Check if task is completed
      const taskClass = task.completed ? "completed-task" : "";

      taskDiv.innerHTML = `
    <div class="${taskClass}">
      <input type="checkbox" class="completeCheck" data-index="${index}" ${
        task.completed ? "checked" : ""
      }>
      <h1>${task.title}</h1>
      <p>${task.description}</p>
      <div id="detContainer">
        <p>Due Date: ${task.dueDate}</p>
        <p>Priority: ${task.priority}</p>
      </div>
      <button class="deleteBtn" data-index="${index}">Delete</button>
      <button class="editBtn" data-index="${index}">Edit</button>
    </div>
  `;
      taskContainer.appendChild(taskDiv);
    });

    // Add listeners for deletion
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        location.reload();
      });
    });

    // Add listeners for editing
    document.querySelectorAll(".editBtn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        localStorage.setItem("editIndex", index);
        window.location.href = "/edit.html";
      });
    });

    document.querySelectorAll(".completeCheck").forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const index = this.getAttribute("data-index");
        tasks[index].completed = this.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        location.reload();
      });
    });
  }
});

document.querySelectorAll(".editBtn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const index = this.getAttribute("data-index");
    localStorage.setItem("editIndex", index); // store index
    window.location.href = "/edit.html";
  });
});
