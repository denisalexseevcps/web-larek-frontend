import { IEvents } from './base/events';
import { Form } from './common/form';

export interface IContacts {
  phone: string;
  email: string;
}

export class Contacts extends Form<IContacts> {
  constructor(
    container: HTMLFormElement,
    events: IEvents
  ) {
    super(container, events);
  }
}