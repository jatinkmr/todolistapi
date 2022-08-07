const Services = require('../Model/Services');
const { taskValidation, taskUpdationValidation } = require('../Validations');

const homecontroller = async (req, res, next) => {
    try {
        res.status(200).send('Welcome to Home Page Controller !!');
    } catch (error) {
        next(error);
    }
};

const createTaskController = async (req, res, next) => {
    try {
        const { error } = taskValidation(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const isPriorityExist = await Services.checkIsPriorityExist(req.body.priority);

        if (isPriorityExist) {
            return res.status(200).json({
                error: true,
                message: 'Same Priority Already Exists!!'
            });
        }

        let reqObj = {
            priority: req.body.priority,
            taskName: req.body.taskName,
            completed: req.body.completed
        };

        const response = await Services.createNewTask(reqObj);

        if (response) {
            return res.status(201).json({
                error: false,
                data: response,
                message: 'Task Created Successfully!!'
            });
        } else {
            return res.status(200).json({
                error: true,
                message: 'Unable to Create any Task!!'
            });
        }
    } catch (error) {
        next(error);
    }
};

const fetchAllTaskController = async (req, res, next) => {
    try {
        const response = await Services.fetchAllTask();

        if (response.length) {
            res.status(200).json({
                error: false,
                message: 'Available Task',
                data: response
            });
        } else{
            res.status(200).json({
                error: false,
                message: 'No Task Available',
                data: response
            });
        }
    } catch (error) {
        next(error);
    }
};

const removeTaskByTaskIdController = async (req, res, next) => {
    try {
        const isTaskExist = await Services.checkIsTaskExist(req.params.taskId);

        if (!isTaskExist) {
            return res.status(200).json({
                error: true,
                message: 'No Such Task Avaiable!!'
            });
        }

        const response = await Services.removeTaskById(req.params.taskId);

        if (response) {
            return res.status(200).json({
                error: false,
                message: 'Task Removed Successfully!!'
            });
        } else {
            return res.status(200).json({
                error: true,
                message: 'Error Occurred While Removing the Task!!'
            });
        }
    } catch (error) {
        next(error);
    }
};

const updateTaskController = async (req, res, next) => {
    try {
        const { error } = taskUpdationValidation(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const isTaskExist = await Services.checkIsTaskExist(req.body.todoId);

        if (!isTaskExist) {
            return res.status(200).json({
                error: true,
                message: 'No Such Task Avaiable!!'
            });
        }

        const isPriorityAvailable = await Services.checkIsPriorityAvailable(req.body);

        if (isPriorityAvailable) {
            return res.status(200).json({
                error: true,
                message: 'Same Priority Already Exists!!'
            });
        }

        const response = await Services.updateAvailableTask(req.body);

        if (response) {
            return res.status(200).json({
                error: false,
                message: 'Task Updated Successfully!!'
            });
        } else {
            return res.status(200).json({
                error: true,
                message: 'Error Occurred While updating the Task!!'
            });
        }
    } catch (error) {
        next(error);
    }
};

const changeTodoStatus = async (req, res, next) => {
    try {
        const isTaskExist = await Services.checkIsTaskExist(req.body.todoId);

        if (!isTaskExist) {
            return res.status(200).json({
                error: true,
                message: 'No Such Task Avaiable!!'
            });
        }

        const response = await Services.updateStatus(req.body.todoId);

        if (response) {
            return res.status(200).json({
                error: false,
                message: 'Todo Status Updated!!'
            });
        } else {
            return res.status(200).json({
                error: true,
                message: 'Error Occurred while Changing the Todo Status!!'
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    homecontroller,
    createTaskController,
    fetchAllTaskController,
    removeTaskByTaskIdController,
    updateTaskController,
    changeTodoStatus
};