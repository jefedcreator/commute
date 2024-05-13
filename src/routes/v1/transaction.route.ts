import TransactionController from '@controllers/transaction.controller';
import { AdminAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { Container, Service } from 'typedi';
@Service()
class TransactionRouter {
  private transactionController = Container.get(TransactionController);

  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .get('/:id', AdminAuth, this.transactionController.getTransaction)
      .get('/', AdminAuth, this.transactionController.getTransactions);
  }
}

export default new TransactionRouter();
