import RiderController from '@controllers/rider.controller';
import { UserAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { Container, Service } from 'typedi';
import TransactionController from '@controllers/transaction.controller';
@Service()
class TransactionRouter {
  private transactionController = Container.get(TransactionController);

  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .get('/:id', UserAuth, this.transactionController.getTransaction)
      .get('/', UserAuth, this.transactionController.getTransactions);
  }
}

export default new TransactionRouter();
