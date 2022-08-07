const express = require('express');
const router = express.Router();
const Controller = require('../Controller/index');
const Boom = require('@hapi/boom');

router.get('/home', Controller.homecontroller);
router.post('/createtask', Controller.createTaskController);
router.get('/gettask', Controller.fetchAllTaskController);
router.delete('/removetask/:taskId', Controller.removeTaskByTaskIdController);
router.patch('/updatetask', Controller.updateTaskController);
router.patch('/changestatus', Controller.changeTodoStatus)

router.all("*", (req, res, next) => {
    res.json(Boom.notFound('Path Not Available').output.payload.message);
});

module.exports = router;
