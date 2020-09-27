import { Publisher, OrderCreatedEvent, Subjects } from '@giedrius.bla/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
