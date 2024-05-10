import RiderService from '@services/rider.service';
import { AuthenticatedRequest } from '@types';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
export default class RiderController {
  constructor(private riderService: RiderService) {}

  getRiderById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId as string;
      let booking = await this.riderService.findOne(id);
      return CustomApiResponse(res, 200, 'booking fetched', booking);
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
