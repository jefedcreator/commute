import { IUser } from '@models/User.model';
import Joi from 'joi';

export const updateUserValidator = (user: IUser) => {
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
