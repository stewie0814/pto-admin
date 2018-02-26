import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Event } from './event.interface';
import { EventsService } from './events.service';

import { Employee } from '../employees/employee.model';
import { EmployeesService } from '../employees/employees.service';

import { Subscription } from 'rxjs/Subscription';

import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

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
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  employeeSubscription: Subscription;
  eventsSubscription: Subscription;
  events: Event[] = [];
  employees: Employee[] = [];

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

  constructor(private eventsService: EventsService,
              private employeesService: EmployeesService,
              private modal: NgbModal) {
  }

  handleEvent(action: string, event: Event): void {
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  ngOnInit() {
    this.employeeSubscription = this.employeesService.employeesChanged.subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      }
    );
    this.employeesService.fetchEmployeesFromService();

    this.eventsSubscription = this.eventsService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
      }
    );
    this.eventsService.fetchEventsFromService();
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      employee: '',
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  onSaveEvents() {
    this.eventsService.saveAllEvents(this.events);
  }
}
