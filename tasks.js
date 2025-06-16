const tasksJson = require('./task.json');
const tasks = tasksJson.tasks;

const getAllTasks = () => {
    return tasks;
}

const getTasksById = (id) => {
    const task = tasks.find(t => t.id === parseInt(id));
    return task;
}

const addTasks = (taskData) => {
    const task = {
        id: tasks.length + 1,
        ...taskData,
    }
    tasks.push(task);
    return task;
}

const updateTasks = (updatedTask, id) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
        return false;
    }
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...updatedTask
    }
    return tasks[taskIndex];
}

const deleteTasks = (id) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
        return false;
    }
    tasks.splice(taskIndex, 1);
    return true;
}

const validatePayload = (payload) => {
    if (!payload || typeof payload !== 'object')
        return false;
    const hasTitle = payload?.hasOwnProperty('title');
    const hasDesciption = payload?.hasOwnProperty('description');
    const hasCompleted = payload?.hasOwnProperty('completed');
    if (!(hasTitle && hasDesciption && hasCompleted))
        return false;
    const isValidTitle = typeof payload?.title === 'string';
    const isValidDescription = typeof payload?.description === 'string';
    const isValidCompletedFiled = typeof payload?.completed === 'boolean';
    return (isValidTitle && isValidDescription && isValidCompletedFiled);
}

module.exports = {
    validatePayload,
    deleteTasks,
    updateTasks,
    addTasks,
    getAllTasks,
    getTasksById
}