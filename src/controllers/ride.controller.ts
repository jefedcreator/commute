import RideService from '@services/ride.service';
import { AuthenticatedRequest } from '@types';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
export default class RideController {
  constructor(private rideService: RideService) {}

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

  cancelRide = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.userId as string;
      let bokingStatus = await this.rideService.cancelRide(
        req.params.id,
        userId,
      );
      return CustomApiResponse(res, 200, 'ride canceled', bokingStatus);
    } catch (e) {
      next(e);
    }
  };

  approveRide = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const riderId = req.userId as string;
      let ride = await this.rideService.approveRide(req.params.id, riderId);
      return CustomApiResponse(res, 200, 'ride accepted', ride);
    } catch (e) {
      next(e);
    }
  };

  completeRide = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const riderId = req.userId as string;
      let ride = await this.rideService.completeRide(req.params.id, riderId);
      return CustomApiResponse(res, 200, 'ride completed', ride);
    } catch (e) {
      next(e);
    }
  };

  verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let booking = await this.rideService.verifyPayment(req.body);
      return CustomApiResponse(res, 201, 'payment verified', booking);
    } catch (e) {
      next(e);
    }
  };
}
