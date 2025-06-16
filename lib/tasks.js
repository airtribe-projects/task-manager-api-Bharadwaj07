const tasksJson = require('../task.json');
const tasks = tasksJson.tasks;

const getAllTasks = (filter = {}, sortBy = 'id', sortOrder = 'asc') => {
    const filteredTasks = tasks.filter((task) => {
        return Object.entries(filter).every(([key, value]) => {
            if (key === 'id') {
                return task[key] === Number(value);
            } else if (key === 'completed') {
                return task[key] === (value === 'true');
            } else if (key === 'title' || key === 'description') {
                const regex = new RegExp(value, 'i');
                return regex.test(task[key]);
            } else {
                return task[key] === value;
            }
        });
    });

    return [...filteredTasks].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });
}

const getTasksById = (id) => {
    const task = tasks.find(t => t.id === Number(id));
    return task;
}

const addTasks = (taskData) => {
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    const task = {
        id: maxId + 1,
        ...taskData,
    }
    tasks.push(task);
    return task;
}

const updateTasks = (updatedTask, id) => {
    const taskIndex = tasks.findIndex(task => task.id === Number(id));
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
    const taskIndex = tasks.findIndex(task => task.id === Number(id));
    if (taskIndex === -1) {
        return false;
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    return deletedTask;
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