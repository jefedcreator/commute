import RideController from '@controllers/ride.controller';
import { PaymentAuth, UserAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';
class RideRouter {
  private rideController = new RideController();
  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .post('/', UserAuth, this.rideController.createBooking)
      .get('/:id', UserAuth, this.rideController.getRideById)
      .put('/cancel', UserAuth, this.rideController.cancelRide)
      .put('/approve', UserAuth, this.rideController.approveRide);
  }
}

export default new RideRouter();
