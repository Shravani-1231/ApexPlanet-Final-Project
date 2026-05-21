let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];

displayTasks();


// LOGIN FUNCTION

function login(){

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    if(username === "admin" &&
       password === "1234"){

        document.getElementById(
            "loginPage"
        ).style.display = "none";

        document.getElementById(
            "mainApp"
        ).style.display = "block";
    }

    else{

        alert("Invalid Username or Password");
    }
}



// ADD TASK

function addTask(){

    let taskInput =
        document.getElementById("taskInput");

    let dateInput =
        document.getElementById("dateInput");

    let priorityInput =
        document.getElementById("priorityInput");

    let taskText =
        taskInput.value.trim();


    // EMPTY VALIDATION

    if(taskText === ""){

        alert("Task cannot be empty");

        return;
    }


    // CHARACTER LIMIT

    if(taskText.length > 50){

        alert(
            "Task should be less than 50 characters"
        );

        return;
    }


    // DUPLICATE CHECK

    let duplicate =
        tasks.some(task =>

            task.text.toLowerCase() ===
            taskText.toLowerCase()

        );

    if(duplicate){

        alert("Task already exists");

        return;
    }


    // CREATE TASK OBJECT

    let task = {

        text: taskText,

        date:
            dateInput.value || "No Date",

        priority:
            priorityInput.value,

        completed: false
    };


    // ADD TASK

    tasks.push(task);

    saveTasks();

    displayTasks();


    // CLEAR INPUTS

    taskInput.value = "";

    dateInput.value = "";
}



// DISPLAY TASKS

function displayTasks(filteredTasks = tasks){

    let taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";


    filteredTasks.forEach((task,index)=>{

        let li =
            document.createElement("li");

        if(task.completed){

            li.classList.add("completed");
        }

        li.innerHTML = `

            <h3>${task.text}</h3>

            <p>📅 ${task.date}</p>

            <p>🔥 Priority: ${task.priority}</p>

            <div class="task-buttons">

                <button onclick="completeTask(${index})">

                    ${task.completed
                        ? "Undo"
                        : "Complete"}

                </button>

                <button onclick="editTask(${index})">

                    Edit

                </button>

                <button onclick="deleteTask(${index})">

                    Delete

                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateTaskCount();
}



// COMPLETE TASK

function completeTask(index){

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    displayTasks();
}



// DELETE TASK

function deleteTask(index){

    let confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );

    if(confirmDelete){

        tasks.splice(index,1);

        saveTasks();

        displayTasks();
    }
}



// EDIT TASK

function editTask(index){

    let newTask =
        prompt(
            "Edit your task",
            tasks[index].text
        );

    if(newTask !== null &&
       newTask.trim() !== ""){

        tasks[index].text = newTask;

        saveTasks();

        displayTasks();
    }
}



// SAVE TASKS

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}



// SEARCH TASK

function searchTask(){

    let searchValue =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let filteredTasks =
        tasks.filter(task =>

            task.text
            .toLowerCase()
            .includes(searchValue)

        );

    displayTasks(filteredTasks);
}



// FILTER TASKS

function filterTasks(type){

    if(type === "completed"){

        displayTasks(

            tasks.filter(task =>
                task.completed)

        );
    }

    else if(type === "pending"){

        displayTasks(

            tasks.filter(task =>
                !task.completed)

        );
    }

    else{

        displayTasks(tasks);
    }
}



// DARK MODE

function toggleDarkMode(){

    document.body.classList.toggle(
        "dark-mode"
    );
}



// TASK COUNT + PROGRESS BAR

function updateTaskCount(){

    let completedTasks =
        tasks.filter(task =>
            task.completed).length;

    let totalTasks =
        tasks.length;

    document.getElementById(
        "taskCount"
    ).innerHTML =

    `Total Tasks: ${totalTasks}
     | Completed: ${completedTasks}`;


    let progress = 0;

    if(totalTasks > 0){

        progress =
            (completedTasks / totalTasks)
            * 100;
    }

    document.getElementById(
        "progressBar"
    ).style.width = progress + "%";
}