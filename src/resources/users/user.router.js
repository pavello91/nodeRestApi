const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
    .route('/')
    .get(async(req, res) => {
        const users = await usersService.getAll();
        res.json(users.map(User.toResponse));
    })
    .post(async(req, res) => {
        const user = new User(req.body);
        await usersService.saveUser(user);
        return res.json(User.toResponse(user));
    });

router
    .route('/:id')
    .get(async(req, res) => {
        const users = await usersService.getUser(req.params.id);
        return res.json(User.toResponse(users));
    })
    .put(async(req, res) => {
        const id = req.params.id;
        const userOne = await usersService.updateUser(id, req.body);
        return res.json(User.toResponse(userOne));
    })
    .delete(async(req, res) => {
        await usersService.deleteUser(req.params.id);
        res.json({ message: 'Пользователь был удален!!' });
    });
module.exports = router;