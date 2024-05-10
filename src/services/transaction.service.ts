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

  async findAll(): Promise<ITransaction[]> {
    const transactions = await Transaction.find({}).sort({
      createdAt: -1,
    });
    return transactions;
  }

  async findAllbyUser(userId: string): Promise<ITransaction[]> {
    const transactions = await Transaction.find({
      $or: [{ riderId: userId }, { userId: userId }],
    }).sort({
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

  //   async getReviews(professionalId: string): Promise<{
  //     metrics: { ratings: number; totalReviews: number };
  //     reviews: Array<IReview>;
  //   }> {
  //     let totalRatings = 0;
  //     const reviews = await Review.find({
  //       professionalId: professionalId,
  //     }).populate({
  //       path: 'userId',
  //       select: ['firstname', 'lastname', 'avatar'],
  //     });
  //     reviews.map((e) => (totalRatings += e.rating));
  //     return {
  //       metrics: {
  //         ratings: Math.round(Number(totalRatings) / Number(reviews.length)),
  //         totalReviews: reviews.length,
  //       },
  //       reviews: reviews,
  //     };
  //   }
}
