import RideController from '@controllers/ride.controller';
import { UserAuth, RiderAuth, PaymentAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { Service, Container } from 'typedi';

@Service()
class RideRouter {
  private rideController = Container.get(RideController);

  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .post('/', UserAuth, this.rideController.createRide)
      .get('/:id', UserAuth, this.rideController.getRideById)
      .patch('/:id/cancel', UserAuth, this.rideController.cancelRide)
      .patch('/:id/approve', RiderAuth, this.rideController.approveRide)
      .patch('/:id/complete', RiderAuth, this.rideController.completeRide)
      .post('/payment/verify', PaymentAuth, this.rideController.verifyPayment);
  }
}

export default new RideRouter();
