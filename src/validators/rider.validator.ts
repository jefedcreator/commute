import { IRider } from '@models/rider.model';
import Joi from 'joi';

export const updateRiderValidator = (rider: IRider) => {
  const schema = Joi.object({
    firstname: Joi.string().trim().optional().label('Firstname'),
    lastname: Joi.string().trim().optional().label('Lastname'),
    phone: Joi.string().trim().optional().label('Phone'),
    avatar: Joi.string().trim().optional().label('Profile Image'),
    walletInfo: {
      currentAmount: Joi.number().optional().label('Current Amount'),
    },
    vehicle: {
      vehicleName: Joi.string()
        .trim()
        .optional()
        .label('Vehicle name is required'),
      vehicleId: Joi.string().trim().optional().label('Vehicle id is required'),
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
  return schema.validate(rider, options);
};
