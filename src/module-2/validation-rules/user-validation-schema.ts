import Joi from 'joi';

export const userSchema = Joi.object({
  id: Joi.string(),
  login: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .pattern(new RegExp('[A-Z]+'))
    .pattern(new RegExp('[a-z]+'))
    .pattern(new RegExp('[0-9]+'))
    .required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean(),
});
