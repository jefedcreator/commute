import RideService from '@services/ride.service';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { NextFunction, Request, Response } from 'express';
export default class RideController {
  private rideService = new RideService();

  createRide = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let create = await this.rideService.createRide(req.body);
      return CustomApiResponse(res, 201, 'ride created', create);
    } catch (e) {
      next(e);
    }
  };

  getRideById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let ride = await this.rideService.findRide(req.params.id);
      return CustomApiResponse(res, 200, 'ride fetched', ride);
    } catch (e) {
      next(e);
    }
  };

  getAllRides = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let rides = await this.rideService.findAllRides();
      return CustomApiResponse(res, 200, 'rides fetched', rides);
    } catch (e) {
      next(e);
    }
  };

  cancelRide = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let bokingStatus = await this.rideService.cancelRide(
        req.params.id,
        req.body.userId,
        req.body.riderId,
      );
      return CustomApiResponse(res, 200, 'ride canceled', bokingStatus);
    } catch (e) {
      next(e);
    }
  };

  approveRide = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let ride = await this.rideService.approveRide(
        req.params.id,
        req.body.riderId,
      );
      return CustomApiResponse(res, 200, 'ride accepted', ride);
    } catch (e) {
      next(e);
    }
  };
}
