const tasksJson = require('../task.json');
const tasks = tasksJson?.tasks || [];

const getAllTasks = (completed, sortBy = 'id', sortOrder = 'asc') => {
    let filteredTasks = tasks;
    if (completed !== null) {
        filteredTasks = tasks.filter((task) => {
            const isCompleted = completed === 'true';
            if (task?.completed === isCompleted)
                return true;
        });
    }
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

const getTasksByPriority = (priorityLevel) => {
    const filteredTasks = tasks.filter(task => task?.priority === priorityLevel);
    return filteredTasks;
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
    const allowedKeys = ['title', 'description', 'completed', 'priority'];
    const payloadKeys = Object.keys(payload);
    const hasOnlyAllowedKeys = payloadKeys.every(key => allowedKeys.includes(key));
    if (!hasOnlyAllowedKeys) return false;

    const hasTitle = Object.prototype.hasOwnProperty.call(payload, 'title');
    const hasDesciption = Object.prototype.hasOwnProperty.call(payload, 'description');
    const hasCompleted = Object.prototype.hasOwnProperty.call(payload, 'completed');
    if (!(hasTitle && hasDesciption && hasCompleted))
        return false;

    const isValidTitle = typeof payload?.title === 'string';
    const isValidDescription = typeof payload?.description === 'string';
    const isValidCompletedField = typeof payload?.completed === 'boolean';

    const validPriorities = ['low', 'medium', 'high'];
    const hasPriority = Object.prototype.hasOwnProperty.call(payload, 'priority');
    const isValidPriority = !hasPriority || validPriorities.includes(payload.priority);
    return (isValidTitle && isValidDescription && isValidCompletedField && isValidPriority);
}

module.exports = {
    validatePayload,
    deleteTasks,
    updateTasks,
    addTasks,
    getAllTasks,
    getTasksById,
    getTasksByPriority
}
