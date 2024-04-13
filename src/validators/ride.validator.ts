import { IRide } from '@models/ride.model';
import Joi from 'joi';

export const createRideValidator = (ride: IRide) => {
  const schema = Joi.object({
    campusName: Joi.string().required().label('Campus name'),
    paymentType: Joi.string().required().label('Payment method'),
    userId: Joi.string().required().label('UserId'),
    riderId: Joi.string().required().label('RiderId'),
    pickupPoint: {
      pickupName: Joi.string().trim().optional(),
      pickupLat: Joi.string().trim().optional(),
      pickupLng: Joi.string().trim().optional(),
    },
    destinationPoint: {
      pickupName: Joi.string().trim().optional(),
      pickupLat: Joi.string().trim().optional(),
      pickupLng: Joi.string().trim().optional(),
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
  return schema.validate(ride, options);
};
