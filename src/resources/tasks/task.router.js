const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router
    .route('/:boardId/tasks/')
    .get(async(req, res) => {
        const boardId = req.params.boardId;
        const tasks = await tasksService.getAll(boardId);
        return res.json(tasks);
    })
    .post(async(req, res) => {
        const task = new Task(req.body);
        const boardId = req.params.boardId;
        const taskOne = await tasksService.saveTask(boardId, task);
        return res.json(taskOne);
    });

router
    .route('/:boardId/tasks/:id')
    .get(async(req, res) => {
        const task = await tasksService.getTask(
            req.params.id,
            req.params.boardId
        );
        return res.json(task);
    })
    .put(async(req, res) => {
        const task = req.body;
        const boardId = req.params.boardId;
        const id = req.params.id;
        const taskOne = await tasksService.updateTask(id, boardId, task);
        return res.json(taskOne);
    })
    .delete(async(req, res) => {
        const id = req.params.id;
        await tasksService.deleteTask(id);
        return res
    });

module.exports = router;