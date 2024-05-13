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
      let transaction = await this.transactionService.findbyId(req.params.id);
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
      let query = {
        status: req.query.status as string,
        type: req.query.type as string,
        channel: req.query.channel as string,
        page: Number(req.query.page),
        size: Number(req.query.size),
      };
      let transaction = await this.transactionService.findAll(query);
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
      let query = {
        status: req.query.status as string,
        type: req.query.type as string,
        channel: req.query.channel as string,
        page: Number(req.query.page),
        size: Number(req.query.size),
      };
      let transaction = await this.transactionService.findAllbyUser(id, query);
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
