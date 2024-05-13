import { IAdmin } from '@models/admin.model';
import { Gender, IUser, UserType } from '@models/user.model';
import Joi from 'joi';
import { IRider } from '@models/rider.model';

export const UserRegistrationValidator = (
  user: IUser,
): Joi.ValidationResult<IUser> => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required().label('Email'),
    firstname: Joi.string().trim().required().label('Firstname'),
    lastname: Joi.string().trim().required().label('Lastname'),
    password: Joi.string().trim().required().label('Password'),
    phone: Joi.string().trim().required().label('Phone'),
    gender: Joi.string()
      .valid(...Object.values(Gender))
      .label('Gender'),
    role: Joi.string().valid('user').required().label('Role'),
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

export const RiderRegistrationValidator = (
  rider: IRider,
): Joi.ValidationResult<IUser> => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required().label('Email'),
    firstname: Joi.string().trim().required().label('Firstname'),
    lastname: Joi.string().trim().required().label('Lastname'),
    password: Joi.string().trim().required().label('Password'),
    phone: Joi.string().trim().required().label('Phone'),
    gender: Joi.string()
      .valid(...Object.values(Gender))
      .label('Gender'),
    vehicle: Joi.object()
      .required()
      .keys({
        vehicleName: Joi.string()
          .trim()
          .required()
          .label('Vehicle name is required'),
        vehicleId: Joi.string()
          .trim()
          .required()
          .label('Vehicle id is required'),
      })
      .label('Vehicle details'),
    role: Joi.string().valid('rider').required().label('Role'),
  });
  const options = {
    errors: {
      wrap: {
        label: '',
        array: '',
      },
    },
  };
  return schema.validate(rider, options);
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
