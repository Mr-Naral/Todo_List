
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');

    // Get tasks from localStorage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Save tasks to localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Render tasks on the screen
    const renderTasks = () => {
        taskList.innerHTML = ''; // Clear the list
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const l1 = document.createElement('l1');
            
            // Apply 'completed' class if the task is marked complete
            li.className = task.completed ? 'completed' : '';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;

            const editButton = document.createElement('button');
            editButton.innerHTML='<span class="material-symbols-outlined">edit</span>'
            editButton.addEventListener('click', () => {
                const newTaskText = prompt('Edit task:', task.text);
                if (newTaskText !== null && newTaskText.trim() !== '') {
                    tasks[index].text = newTaskText.trim();
                    saveTasks();
                    renderTasks();
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(taskText);
            l1.appendChild(editButton);
            l1.appendChild(deleteButton);
            li.appendChild(l1)
            

            taskList.appendChild(li);
        });
    };

    // Add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (!taskText) {
            alert('Task cannot be empty!');
            return;
        }

        tasks.push({ text: taskText, completed: false });
        taskInput.value = ''; // Clear the input field
        saveTasks();
        renderTasks();
    };

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Load and render tasks when the page loads
    renderTasks();
});
