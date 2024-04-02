import { IRide } from '@models/ride.model';
import Joi from 'joi';

export const createRideValidator = (ride: IRide) => {
  const schema = Joi.object({
    campusName: Joi.number().required().label('Campus name'),
    paymentType: Joi.number().required().label('Payment method'),
    totalPersons: Joi.number().required().label('Total persons'),
    bookingDate: Joi.string().required().label('Booking date'),
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
};
