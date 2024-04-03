import { Router } from 'express';
import AuthRouter from './auth.route';
import UserRouter from './user.route';
import VerificationRouter from './verification.route';
import ProfessionalRouter from './professional.route';
import CategoryRouter from './category.route';
import AppSettingsRouter from './app.default.route';
import BookingRouter from './booking.route';
import TransactionRouter from './transaction.route';
import AdminRouter from './admin.route';
const router = Router();

router.use('/admin', AdminRouter.router);
router.use('/auth', AuthRouter.router);
router.use('/users', UserRouter.router);
router.use('/professionals', ProfessionalRouter.router);
router.use('/verifications', VerificationRouter.router);
router.use('/categories', CategoryRouter.router);
router.use('/bookings', BookingRouter.router);
router.use('/transactions', TransactionRouter.router);
router.use('/app', AppSettingsRouter.router);

export default router;
