import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UsersService {
  private users: User[];
  private usersChanged = new Subject<User[]>();
  constructor ( private http: Http ) {}

  getUsers () {
    return this.users.slice();
  }

  getUser (index: number) {
    return this.users[index];
  }

  addUsers (user: User) {
    this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }
}
