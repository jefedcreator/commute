import TransactionService from '@services/transaction.service';
import { AuthenticatedRequest } from '@types';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { NextFunction, Response } from 'express';
import { Service } from 'typedi';
@Service()
export default class TransactionController {
  constructor(private transactionService: TransactionService) {}

  getTransaction = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId as string;
      let transaction = await this.transactionService.findbyId(id);
      return CustomApiResponse(res, 200, 'transaction fetched', transaction);
    } catch (e) {
      next(e);
    }
  };

  getTransactions = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId as string;
      let transaction = await this.transactionService.findAll();
      return CustomApiResponse(res, 200, 'transactions fetched', transaction);
    } catch (e) {
      next(e);
    }
  };

  getUserTransactions = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      let transaction = await this.transactionService.findAllbyUser(id);
      return CustomApiResponse(res, 200, 'transactions fetched', transaction);
    } catch (e) {
      next(e);
    }
  };

  updateTransaction = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId as string;
      let transaction = await this.transactionService.updateTransaction(
        id,
        req.body,
      );
      return CustomApiResponse(res, 200, 'transaction updated', transaction);
    } catch (e) {
      next(e);
    }
  };
}
