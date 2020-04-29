import Joi from '@hapi/joi';
import { Request } from 'express';
import { IUserRequestPayload } from 'types/user';

export const ValidateSignup = (data: Request)=> {
  const schema = Joi.object().keys({
    userName: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });

  return schema.validate(data);
}

export const ValidateLogin = (data: any) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  })

  return schema.validate(data);
}
