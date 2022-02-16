const Joi = require("joi")

const JoinValidationSchema= Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string
})