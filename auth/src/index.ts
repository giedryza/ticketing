import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('starting up');

  if (!process.env.JWT_KEY) {
    throw new Error('no jwt');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('no mongo uri');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('server started at 3000');
  });
};

start();

// kubectl create secret generic jwt-secret --from-literal=JWT_KEY=secret
// npm install --save-dev mongodb-memory-server@6.5.0
