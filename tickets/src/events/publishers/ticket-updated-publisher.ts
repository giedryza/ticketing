import { Publisher, Subjects, TicketUpdatedEvent } from '@giedrius.bla/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
