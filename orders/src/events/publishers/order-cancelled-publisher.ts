import { Publisher, OrderCancelledEvent, Subjects } from '@giedrius.bla/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
