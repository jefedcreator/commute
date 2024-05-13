import { Exception } from '@middlewares/error.middleware';
import Transaction, { ITransaction } from '@models/transaction.model';
import { Service } from 'typedi';

@Service()
export default class TransactionService {
  createTransaction = async (data: ITransaction): Promise<ITransaction> => {
    let createTransaction = await Transaction.create(data);
    return createTransaction;
  };

  async findbyId(id: string): Promise<ITransaction> {
    let transaction = await Transaction.findById(id).populate({
      path: 'rideId',
      select: ['pickupPoint', 'destinationPoint'],
    });
    if (!transaction) throw new Exception(404, 'transaction not found');
    return transaction;
  }

  async findAll(query: {
    size: number;
    page: number;
    status: string;
    type: string;
    channel: string;
  }): Promise<ITransaction[]> {
    let filter = {};
    if (query.status) {
      filter = { status: query.status };
    }
    if (query.type) {
      filter = { type: query.type };
    }
    if (query.channel) {
      filter = { paymentChannel: query.channel };
    }
    const pageSize = Number(query.size) || 0;
    const pageNumber = Number(query.page) || 1;
    const skip = pageSize * pageNumber - pageSize;
    const transactions = await Transaction.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({
        createdAt: -1,
      });
    return transactions;
  }

  async findAllbyUser(
    userId: string,
    {
      size,
      page,
      status,
      type,
      channel,
    }: {
      size: number;
      page: number;
      status: string;
      type: string;
      channel: string;
    },
  ): Promise<ITransaction[]> {
    let filter: any = {};
    if (status) {
      filter.status = status;
    }
    if (type) {
      filter.type = type;
    }
    if (channel) {
      filter.paymentChannel = channel;
    }
    const pageSize = Number(size) || 0;
    const pageNumber = Number(page) || 1;
    const skip = pageSize * pageNumber - pageSize;

    const transactions = await Transaction.find({
      $or: [{ riderId: userId }, { userId: userId }],
      ...filter,
    })
      .skip(skip)
      .limit(pageSize)
      .sort({
        createdAt: -1,
      });
    return transactions;
  }

  async updateTransaction(
    id: string,
    data: Partial<ITransaction>,
  ): Promise<ITransaction> {
    // const { error, value } = updateRiderValidator(data);
    // if (error) throw new Exception(400, error.details[0].message);
    let transaction = await Transaction.findByIdAndUpdate(id, data, {
      upsert: true,
    });
    if (!transaction) throw new Exception(404, 'transaction not found');
    return await this.findbyId(id);
  }
}
