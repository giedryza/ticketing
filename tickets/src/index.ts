import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('no jwt');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('no mongo uri');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('no nats client id');
  }
  if (!process.env.NATS_URL) {
    throw new Error('no nats url');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('no nats cluster id');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('nats connection closed');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

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
