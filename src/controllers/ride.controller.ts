import RideService from '@services/ride.service';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { NextFunction, Request, Response } from 'express';
export default class RideController {
  private rideService = new RideService();

  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let create = await this.rideService.createRide(req.body);
      return CustomApiResponse(res, 201, 'booking created', create);
    } catch (e) {
      next(e);
    }
  };

  getRideById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let booking = await this.rideService.findRide(req.params.id);
      return CustomApiResponse(res, 200, 'booking fetched', booking);
    } catch (e) {
      next(e);
    }
  };

  getAllRides = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let bookings = await this.rideService.findAllRides();
      return CustomApiResponse(res, 200, 'bookings fetched', bookings);
    } catch (e) {
      next(e);
    }
  };

  cancelRide = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let bokingStatus = await this.rideService.cancelRide(
        req.body.bookingId,
        req.body.userId,
        req.body.riderId,
      );
      return CustomApiResponse(res, 200, 'booking canceled', bokingStatus);
    } catch (e) {
      next(e);
    }
  };

  approveRide = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let booking = await this.rideService.approveRide(
        req.body.bookingId,
        req.body.professionalId,
      );
      return CustomApiResponse(res, 200, 'booking accepted', booking);
    } catch (e) {
      next(e);
    }
  };
}
