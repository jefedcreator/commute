import { IUser } from '@models/user.model';
import Joi from 'joi';

export const UpdateUserValidator = (user: IUser) => {
  const schema = Joi.object({
    firstname: Joi.string().trim().optional().label('Firstname'),
    lastname: Joi.string().trim().optional().label('Lastname'),
    phone: Joi.string().trim().optional().label('Phone'),
    avatar: Joi.string().trim().optional().label('Profile Image'),
    walletInfo: {
      currentAmount: Joi.number().optional().label('Current Amount'),
    },
  });
  const options = {
    errors: {
      wrap: {
        label: '',
        array: '',
      },
    },
  };
  return schema.validate(user, options);
};

export const UpdatePasswordValidator = (user: IUser) => {
  const schema = Joi.object({
    oldPassword: Joi.string().trim().required().label('Old Password'),
    password: Joi.string().trim().required().label('Password'),
    confirmPassword: Joi.string().trim().required().label('Confirm Password'),
  });
  const options = {
    errors: {
      wrap: {
        label: '',
      },
    },
  };
  return schema.validate(user, options);
};
