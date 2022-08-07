const task = require('./Task');

const createNewTask = async (reqObj) => {
    return await task.create(reqObj);
};

const checkIsPriorityExist = async priority => {
    const isExist = await task.findOne({
        priority: priority
    });

    if (isExist) {
        return true;
    } else {
        return false;
    }
};

const fetchAllTask = async () => {
    return await task.find().sort({ 'priority': 1 });
};

const checkIsTaskExist = async taskId => {
    const isTaskExist = await task.findOne({
        '_id': taskId
    });

    if (isTaskExist) {
        return true;
    } else {
        return false;
    }
};

const removeTaskById = async taskId => {
    return await task.deleteOne({
        '_id': taskId
    });
};

const checkIsPriorityAvailable = async body => {
    const isDataExist = await task.findOne({
        '_id': body._id
    });

    if ((!isDataExist) || (isDataExist._id.toString() == body._id.toString())) {
        return false;
    }

    return true;
};

const updateAvailableTask = async body => {
    return await task.updateOne({
        _id: body.todoId
    }, {
        taskName: body.taskName,
        priority: body.priority,
        completed: false
    });
};

const updateStatus = async todoId => {
    const isDataExist = await task.findOne({
        '_id': todoId
    });

    return await task.updateOne({
        _id: todoId
    }, {
        completed: !isDataExist.completed
    });
}

module.exports = {
    createNewTask,
    checkIsPriorityExist,
    fetchAllTask,
    checkIsTaskExist,
    removeTaskById,
    checkIsPriorityAvailable,
    updateAvailableTask,
    updateStatus
};