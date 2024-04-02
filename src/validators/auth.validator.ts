import { IAdmin } from '@models/Admin.model';
import { Gender, IUser } from '@models/User.model';
import Joi from 'joi';

export const RegistrationValidator = (user: IUser) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required().label('Email'),
    firstname: Joi.string().trim().required().label('Firstname'),
    lastname: Joi.string().trim().required().label('Lastname'),
    password: Joi.string().trim().required().label('Password'),
    phone: Joi.string().trim().required().label('Phone'),
    gender: Joi.any().valid(Gender.male, Gender.female),
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

export const LoginValidator = (user: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required().label('Email'),
    password: Joi.string().trim().required().label('Password'),
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

export const ResetPasswordValidator = (user: IUser) => {
  const schema = Joi.object({
    password: Joi.string().trim().required().label('Password'),
    confirmPassword: Joi.string().trim().required().label('Confirm Password'),
    email: Joi.string().email().trim().optional().label('Email'),
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

export const AdminRegisterValidator = (admin: IAdmin) => {
  const schema = Joi.object({
    firstname: Joi.string().trim().required().label('Firstname'),
    lastname: Joi.string().trim().required().label('Lastname'),
    email: Joi.string().email().trim().required().label('Email'),
    password: Joi.string().trim().required().label('Password'),
  });
  const options = {
    errors: {
      wrap: {
        label: '',
        array: '',
      },
    },
  };
  return schema.validate(admin, options);
};
