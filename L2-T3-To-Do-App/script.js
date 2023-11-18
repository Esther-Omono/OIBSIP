function useLocalStorage(key, defaultValue) {
    // Retrieve the item from localStorage
    const storedValue = localStorage.getItem(key);
    // Parse the stored JSON or use the default value
    const initial = storedValue ? JSON.parse(storedValue) : defaultValue;
    
    // Create a state variable
    let value = initial;

    // Getter function to get the current value
    const getValue = () => value;

    // Setter function to update the value and store it in localStorage
    const setValue = (newValue) => {
        value = newValue;
        localStorage.setItem(key, JSON.stringify(value));
    };

    // Return the getter and setter
    return [getValue, setValue];
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = {
            text: taskText,
            date: new Date().toLocaleString(),
            completed: false
        };

        // Invoke the getter to get the actual array
        const tasksArray = tasksGetter();

        // Update the tasks array
        tasksArray.push(task);

        // Invoke the setter to update localStorage
        setTasks([...tasksArray]);

        taskInput.value = "";

        // Update the display
        displayTasks();
     }
}

function displayTasks() {
    // Invoke the getter to get the actual array
    const tasksArray = tasksGetter();

    const pendingTasksList = document.getElementById("pendingTasks");
    const completedTasksList = document.getElementById("completedTasks");

    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    tasksArray.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="task-group">
            <input class="checkbox" type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
            <span>${task.text}</span>
            <span>${task.date}</span>
            </div>
            <div class="task-group">
            <button class="edit" onclick="editTask(${index})">Edit</button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        if (task.completed) {
            li.classList.add("completed");
            completedTasksList.appendChild(li);
        } else {
            pendingTasksList.appendChild(li);
        }
    });
}

function toggleComplete(index) {
    // Invoke the getter to get the actual array
    const tasksArray = tasksGetter();

    // Toggle the 'completed' property of the selected task
    tasksArray[index].completed = !tasksArray[index].completed;

    // Invoke the setter to update localStorage
    setTasks([...tasksArray]);

    displayTasks();
}

function editTask(index) {
    // Invoke the getter to get the actual array
    const tasksArray = tasksGetter();

    const newText = prompt("Edit task:", tasksArray[index].text);
            
    if (newText !== null) {
        // Update the text property of the selected task
        tasksArray[index].text = newText.trim();

        // Invoke the setter to update localStorage
        setTasks([...tasksArray]);

        // Update the display
        displayTasks();
        }
}

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        // Invoke the getter to get the actual array
        const tasksArray = tasksGetter();

        // Remove the task at the specified index
        tasksArray.splice(index, 1);

        // Invoke the setter to update localStorage
        setTasks([...tasksArray]);

        // Update the display
        displayTasks();
    }
}

// Example tasks
const [tasksGetter, setTasks] = useLocalStorage("tasks", []);

displayTasks();