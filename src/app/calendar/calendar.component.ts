import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

import { Event } from '../events/event.interface';
import { Employee } from '../employees/employee.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EventsService } from '../events/events.service';
import { EmployeesService } from '../employees/employees.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  moduleId: module.id,
  selector: 'calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendar.component.css'],
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: Event;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: Event }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: Event }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: Event[] = [];
  events$: Observable<Event[]>;
  employees: Employee[] = [];
  eventsSubscription: Subscription;
  employeeSubscription: Subscription;
  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,
              private eventsService: EventsService,
              private employeesService: EmployeesService) {}

  ngOnInit() {
    // Load up employees
    this.employeeSubscription = this.employeesService.employeesChanged.subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      });

      this.employeesService.fetchEmployeesFromService();
    //Load up Events
    this.eventsSubscription = this.eventsService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
      }
    );
    //this.eventsService.fetchEventsFromService();
    this.events$ = this.eventsService.fetchEventsForCalendar();
  }

  dayClicked({ date, events }: { date: Date; events: Event[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  handleEvent(action: string, event: Event): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

}
