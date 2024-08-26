import Joi from 'joi';

export const validateSignup = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profileImage: Joi.string().uri().required(),
  });

  return schema.validate(data);
};

export const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

export const validateBlog = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().uri().required(),
    description: Joi.string().required(),
  });

  return schema.validate(data);
};

export const validateComment = (data) => {
  const schema = Joi.object({
    content: Joi.string().required(),
  });

  return schema.validate(data);
};