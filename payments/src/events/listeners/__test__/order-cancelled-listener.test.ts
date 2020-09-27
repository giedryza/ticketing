// import mongoose from 'mongoose';
// import { Message } from 'node-nats-streaming';
// import { OrderCancelledEvent, OrderStatus } from '@giedrius.bla/common';
// import { natsWrapper } from '../../../nats-wrapper';
// import { Order } from '../../../models/order';
// import { OrderCancelledListener } from '../order-cancelled-listener';

// const setup = async () => {
//   const listener = new OrderCancelledListener(natsWrapper.client);

//   const order = Order.build({
//     id: mongoose.Types.ObjectId().toHexString(),
//     status: OrderStatus.Created,
//     price: 10,
//     userId: 'dsfads',
//     version: 0,
//   });
//   await order.save();

//   const data: OrderCancelledEvent['data'] = {
//     id: order.id,
//     version: 1,
//     ticket: {
//       id: 'fasd',
//     },
//   };

//   // @ts-ignore
//   const msg: Message = {
//     ack: jest.fn(),
//   };

//   return {
//     listener,
//     data,
//     msg,
//     order,
//   };
// };

// it('updates the status of the order', async () => {
//   const { listener, data, msg, order } = await setup();

//   await listener.onMessage(data, msg);

//   const updatesOrder = await Order.findById(order.id);

//   expect(updatesOrder!.status).toEqual(OrderStatus.Cancelled);
// });

// it('acks the message', async () => {
//   const { listener, data, msg } = await setup();

//   await listener.onMessage(data, msg);

//   expect(msg.ack).toHaveBeenCalled();
// });
