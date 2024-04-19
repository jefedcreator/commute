import RideController from '@controllers/ride.controller';
import { UserAuth, RiderAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';
class RideRouter {
  private rideController = new RideController();
  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .post('/', UserAuth, this.rideController.createRide)
      .get('/:id', UserAuth, this.rideController.getRideById)
      .put('/:id/cancel', UserAuth, this.rideController.cancelRide)
      .put('/:id/approve', RiderAuth, this.rideController.approveRide)
      .put('/:id/complete', RiderAuth, this.rideController.completeRide);
  }
}

export default new RideRouter();
