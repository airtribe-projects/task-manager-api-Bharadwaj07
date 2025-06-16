const express =  require('express');
const taskService = require('../lib/tasks');

const router = express.Router();

router.get('/', (req, res) => {
    const tasks = taskService.getAllTasks();
    res.status(200).json(tasks);
});



// GET /tasks/:id
router.get('/:id', (req, res) => {
    const id = req.params['id'];
    if (!id) {
        return res.sendStatus(400);
    }
    const task = taskService.getTasksById(id);
    if (!task) {
        return res.sendStatus(404);
    }
    res.json(task);
});

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
    const id = req.params['id'];
    const body = req.body;
    if (!(id && taskService.validatePayload(body))) {
        return res.sendStatus(400);
    }
    const task = taskService.updateTasks(body, id);
    if (!task) {
        return res.sendStatus(404);
    }
    res.json(task);
});

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
    const id = req.params['id'];
    if (!id) {
        return res.sendStatus(400);
    }
    const deletedTask = taskService.deleteTasks(id);
    if (!deletedTask) {
        return res.sendStatus(404);
    }
    res.sendStatus(200);
});

module.exports =  router;