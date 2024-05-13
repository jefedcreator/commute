import { Router } from 'express';
import AdminRouter from './admin.route';
import AuthRouter from './auth.route';
import RideRouter from './ride.route';
import RiderRouter from './rider.route';
import TransactionRouter from './transaction.route';
import UserRouter from './user.route';
const router = Router();

router.use('/admin', AdminRouter.router);
router.use('/auth', AuthRouter.router);
router.use('/user', UserRouter.router);
router.use('/rides', RideRouter.router);
router.use('/rider', RiderRouter.router);
router.use('/transactions', TransactionRouter.router);

export default router;
