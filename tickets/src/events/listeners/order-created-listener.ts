import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCreatedEvent } from '@giedrius.bla/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // fint the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('no ticket');
    }

    // mark the ticket as reserved by setting orderId
    ticket.set({ orderId: data.id });

    // save tocket and ack message

    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    msg.ack();
  }
}
