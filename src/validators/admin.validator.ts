import { IAdmin } from '@models/admin.model';
import Joi from 'joi';

export const updateAdminValidator = (admin: IAdmin) => {
  const schema = Joi.object({
    firstname: Joi.string().trim().optional().label('Firstname'),
    lastname: Joi.string().trim().optional().label('Lastname'),
    email: Joi.string().trim().optional().label('Phone'),
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
