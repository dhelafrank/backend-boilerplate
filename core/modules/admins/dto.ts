import Joi from 'joi';

//DTOs
export const newAdminDTO = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailAddress: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().min(8).required()
});

export const changePasswordDTO = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).required()
});