import { Router } from 'express';
import AdminRouter from './admin.route';
import AuthRouter from './auth.route';
import RideRouter from './ride.route';
import UserRouter from './user.route';
import RiderRouter from './rider.route';
const router = Router();

router.use('/admin', AdminRouter.router);
router.use('/auth', AuthRouter.router);
router.use('/users', UserRouter.router);
router.use('/ride', RideRouter.router);
router.use('/rider', RiderRouter.router);
// router.use('/transactions', TransactionRouter.router);

export default router;
