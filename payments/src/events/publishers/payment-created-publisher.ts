import { PaymentCreatedEvent, Publisher, Subjects } from '@giedrius.bla/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
