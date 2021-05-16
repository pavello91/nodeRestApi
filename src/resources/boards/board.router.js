const router = require('express').Router();
const Board = require('./board.model');
const BoardsService = require('./board.service');

router
    .route('/')
    .get(async(req, res) => {
        const boards = await BoardsService.getAll();
        return res.json(boards);
    })
    .post(async(req, res) => {
        const board = await new Board(req.body);
        await BoardsService.saveBoard(board);
        return res.json(board);
    });

router
    .route('/:id')
    .get(async(req, res) => {
        const board = await BoardsService.getBoard(req.params.id);
        return res.json(board);
    })
    .put(async(req, res) => {
        const board = new Board(req.body);
        const id = req.params.id;
        const boardOne = await BoardsService.updateBoard(id, board);
        return res.json(boardOne);
    })
    .delete(async(req, res) => {
        const boardsAll = await BoardsService.getAll();
        const boards = await BoardsService.deleteBoard(req.params.id);
        return res.json(boards);
    });

module.exports = router;