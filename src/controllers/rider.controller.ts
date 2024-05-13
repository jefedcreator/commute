import RideService from '@services/ride.service';
import RiderService from '@services/rider.service';
import TransactionService from '@services/transaction.service';
import { AuthenticatedRequest } from '@types';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { NextFunction, Response } from 'express';
import { Service } from 'typedi';

@Service()
export default class RiderController {
  constructor(
    private riderService: RiderService,
    private transactionService: TransactionService,
    private rideService: RideService,
  ) {}

  getRiderById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId as string;
      let rider = await this.riderService.findOne(id);
      return CustomApiResponse(res, 200, 'rider fetched', rider);
    } catch (e) {
      next(e);
    }
  };

  getTransactions = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId as string;
      let user = await this.transactionService.findAllbyUser(id);
      return CustomApiResponse(res, 200, 'user fetched', user);
    } catch (e) {
      next(e);
    }
  };

  getRides = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId as string;
      let user = await this.rideService.findUserRides(id);
      return CustomApiResponse(res, 200, 'user fetched', user);
    } catch (e) {
      next(e);
    }
  };

  updateRider = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId as string;
      let rider = await this.riderService.updateOne(id, req.body);
      return CustomApiResponse(res, 200, 'rider updated', rider);
    } catch (e) {
      next(e);
    }
  };
}
