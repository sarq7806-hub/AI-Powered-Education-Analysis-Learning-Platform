let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];

let selectedTask = null;


function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


function displayTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="completeTask(${index})"
            >

            <span onclick="selectTask(${index})">
                ${task.text}
            </span>
        `;

        taskList.appendChild(li);

    });
}


function addTask() {

    const input =
        document.getElementById("taskInput");

    const taskText =
        input.value.trim();

    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }

    tasks.push({

        text: taskText,

        completed: false

    });

    input.value = "";

    saveTasks();

    displayTasks();
}


function selectTask(index) {

    selectedTask = index;

    alert(
        "Selected task: " +
        tasks[index].text
    );
}


function completeTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    displayTasks();
}


function deleteTask() {

    if (selectedTask === null) {

        alert("Please select a task.");

        return;
    }

    tasks.splice(selectedTask, 1);

    selectedTask = null;

    saveTasks();

    displayTasks();
}


function clearTasks() {

    if (tasks.length === 0) {

        alert("No tasks available.");

        return;
    }

    const confirmDelete =
        confirm("Delete all tasks?");

    if (confirmDelete) {

        tasks = [];

        selectedTask = null;

        saveTasks();

        displayTasks();
    }
}


document
    .getElementById("taskInput")
    .addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {

                addTask();

            }

        }
    );


displayTasks();