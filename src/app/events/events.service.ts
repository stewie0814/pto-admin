import { Injectable } from '@angular/core';
import { Employee } from '../employees/employee.model';
import { Event } from './event.interface';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CalendarEvent } from 'angular-calendar';
import 'rxjs/Rx';

@Injectable()
export class EventsService {
  private events: Event[] = [];
  eventsChanged = new Subject<Event[]>();
  subscription: Subscription;
  eventDataURL = 'https://pto-admin.firebaseio.com/events.json';

  constructor(private http: Http) {}

  getEvents() {
    return this.events;
  }

  getEvent(index: number) {
    return this.events[index];
  }

  addEvent(event: Event) {
    this.events.push(event);
    this.eventsChanged.next(this.events.slice());
    this.callSaveEventService();
  }

  updateEvent(index: number, event: Event) {
    this.events[index] = event;
    this.eventsChanged.next(this.events.slice());
    this.callSaveEventService();
  }

  deleteEvent(index: number) {
    this.events.splice(index, 1);
    this.eventsChanged.next(this.events.slice());
    this.callSaveEventService();
  }

  saveAllEvents(events: Event[]) {
    this.events = events;
    this.eventsChanged.next(this.events.slice());
    this.callSaveEventService();
  }

  callSaveEventService() {
    this.subscription = this.saveEventsToService()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  saveEventsToService() {
    return this.http.put(this.eventDataURL, this.getEvents())
      .map((response: Response) => {
        return response.json();
      })
      .catch((error) => {
        return Observable.throw('There was an error when trying to save data');
      });
  }

  fetchEventsFromService() {
    return this.http.get(this.eventDataURL)
      .map((response: Response) => {
        const events:Event[] = response.json() || [];
        return events;
      })
      .subscribe(
        (events: Event[]) => {
          this.setEvents(events);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setEvents(events: Event[]) {
    const newEvents: Event[] = [];
    events.forEach((event) => {
      let tmp: Event = event;
      tmp.start = new Date(event.start);
      tmp.end = new Date(event.end);
      newEvents.push(tmp);
    })
    this.events = newEvents;
    this.eventsChanged.next(this.events.slice());
  }

}
