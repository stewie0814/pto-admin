import { Employee } from '../employees/employee.model';
import { CalendarEvent } from 'angular-calendar';

export interface Event extends CalendarEvent {
  employee: number;
}
