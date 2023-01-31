//editar tarefa == Não consigo
//botão de edição da tarefa
//criar um container para a palavra que foi enviada como tarefa (como se fosse um limitador de texto)
//criar sub tarefas, arrastar as tarefas para alterar a ordem de tarefas
//caixa de marcação de finalizado inves de riscar a palavra

const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector('.tasks-container');

const validadeInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validadeInput();

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add("fa-regular");
    deleteItem.classList.add("fa-trash-can");

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage();
};

const updateTask = () => {
    
};

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle("completed");
        }
    };

    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
        if (currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        };
    };
    updateLocalStorage();
};

const haddleInputChange = () => {
    const inputIsValid = validadeInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    };
};

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [...tasks].map((task) => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains("completed");

        return { description: content.innerText, isCompleted }
    });
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if(!tasksFromLocalStorage) return;

    for (const task of tasksFromLocalStorage){
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item');
    
        const taskContent = document.createElement('p');
        taskContent.innerText = task.description;
        
        if(task.isCompleted){
            taskContent.classList.add("completed");
        };
    
        taskContent.addEventListener('click', () => handleClick(taskContent));
    
        const deleteItem = document.createElement('i');
        deleteItem.classList.add("fa-regular");
        deleteItem.classList.add("fa-trash-can");
    
        deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));
    
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
    
        tasksContainer.appendChild(taskItemContainer);
    };
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => haddleInputChange());
