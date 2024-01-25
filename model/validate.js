const Joi = require("joi");

const JoiPlayer = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  age: Joi.number().integer().min(0),
  height: Joi.string(),
  jerseyNo: Joi.number().integer().min(1),
  position: Joi.string(),
  shoeSize: Joi.number().integer().min(1),
  isCaptain: Joi.boolean(),
}).options({ allowUnknown: true, stripUnknown: true });

module.exports = JoiPlayer;
