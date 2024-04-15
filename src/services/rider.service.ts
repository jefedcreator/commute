import { Exception } from '@middlewares/error.middleware';
import Rider, { IRider } from '@models/rider.model';
import { updateRiderValidator } from '@validators/rider.validator';
export default class RiderService {
  async findOne(id: string): Promise<IRider> {
    let rider = await Rider.findById(id);
    if (!rider) throw new Exception(404, 'rider not found');
    return rider;
  }

  async updateOne(id: string, data: IRider): Promise<IRider> {
    const { error, value } = updateRiderValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    let rider = await Rider.findByIdAndUpdate(id, value, {
      upsert: true,
    });
    if (!rider) throw new Exception(404, 'professional not found');
    return await this.findOne(id);
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
