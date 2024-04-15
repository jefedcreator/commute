import mongoose, { ConnectOptions } from 'mongoose';
import { config } from '../config/index';

const connectDB = async () => {
  try {
    const mongodbUri = config.mongo.host;
    const dbName = config.mongo.name;
    await mongoose.set('strictQuery', true);
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      autoIndex: config.appEnv !== 'production',
      useUnifiedTopology: true,
      dbName: dbName,
      family: 4,
    } as ConnectOptions);
    return console.log('Mongodb Connected');
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;
