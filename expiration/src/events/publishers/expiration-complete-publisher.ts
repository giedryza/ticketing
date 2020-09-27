import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from '@giedrius.bla/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete;
}
