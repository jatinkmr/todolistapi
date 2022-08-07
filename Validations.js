const Joi = require('joi');

const taskValidation = data => {
    const schema = Joi.object({
        priority: Joi.number().required().min(1),
        taskName: Joi.string().required().min(5).max(255),
        completed: Joi.boolean()
    });

    return schema.validate(data);
};

const taskUpdationValidation = data => {
    const schema = Joi.object({
        todoId: Joi.string().required(),
        priority: Joi.number().min(1).required(),
        taskName: Joi.string().min(5).max(255)
    });

    return schema.validate(data);
};

module.exports = {
    taskValidation,
    taskUpdationValidation
};