const express = require('express');
const taskService = require('../lib/tasks');

const router = express.Router();

// GET /tasks
router.get('/', (req, res) => {
    const { completed, sort, order } = req.query;
    const completedValue = completed ? completed === 'true' : null;
    const sortField = sort || null;
    const sortOrder = order || null
    const tasks = taskService.getAllTasks(completedValue, sortField, sortOrder);
    res.status(200).json(tasks);
});



// GET /tasks/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Invalid task id' });
    }
    const task = taskService.getTasksById(id);
    if (!task) {
        return res.sendStatus(404);
    }
    res.json(task);
});

// GET /tasks/priority/:level
router.get('/priority/:level', (req, res) => {
    const { level } = req.params;
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(level))
        return res.status(400).json({ message: 'Invalid priority level' });
    const tasks = taskService.getTasksByPriority(level);
    res.json(tasks);
})

// POST /tasks
router.post('/', (req, res) => {
    const body = req.body;
    if (!taskService.validatePayload(body)) {
        return res.sendStatus(400);
    }
    const task = taskService.addTasks(body);
    res.status(201).json(task);
});

//PUT /tasks/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    if (!(id && taskService.validatePayload(body))) {
        return res.status(400).json({ message: 'Invalid payload' });
    }
    const task = taskService.updateTasks(body, id);
    if (!task) {
        return res.status(404).json({ message: `Task not found for the ID: ${id}` });
    }
    res.status(200).json(task);
});

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Invalid task id' });
    }
    const deletedTask = taskService.deleteTasks(id);
    if (!deletedTask) {
        return res.status(404).json({ message: `Task not found for the ID: ${id}` });
    }
    res.sendStatus(200);
});

module.exports = router;
