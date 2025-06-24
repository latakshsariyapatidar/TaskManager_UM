document.addEventListener('DOMContentLoaded', () => {
  const index = localStorage.getItem('editIndex');
  if (index === null) {
    alert("No task selected to edit.");
    window.location.href = "/look_tasks.html";
    return;
  }

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks[index];

  // Populate form
  document.getElementById('edit_title').value = task.title;
  document.getElementById('edit_description').value = task.description;
  document.getElementById('edit_due').value = task.dueDate;
  document.getElementById('edit_priority').value = task.priority;

  // Handle form submit
  document.getElementById('editForm').addEventListener('submit', (e) => {
    e.preventDefault();

    tasks[index] = {
      title: document.getElementById('edit_title').value,
      description: document.getElementById('edit_description').value,
      dueDate: document.getElementById('edit_due').value,
      priority: document.getElementById('edit_priority').value,
    };

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.removeItem('editIndex');
    window.location.href = "/look_tasks.html";
  });
});
