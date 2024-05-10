import RiderService from '@services/rider.service';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
export default class RiderController {
  constructor(private riderService: RiderService) {}

  getRiderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let booking = await this.riderService.findOne(req.params.id);
      return CustomApiResponse(res, 200, 'booking fetched', booking);
    } catch (e) {
      next(e);
    }
  };

  updateRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let booking = await this.riderService.updateOne(
        req.body.bookingId,
        req.body,
      );
      return CustomApiResponse(res, 200, 'booking accepted', booking);
    } catch (e) {
      next(e);
    }
  };
}
