import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Injectable()
export class UsersService {
  private users: User[] = [];
  usersChanged = new Subject<User[]>();
  subscription: Subscription;
  userDataURL = 'https://pto-admin.firebaseio.com/users.json';
  constructor ( private http: Http ) {}

  getUsers () {
    return this.users.slice();
  }

  getUser (index: number) {
    return this.users[index];
  }

  addUser (user: User) {
    this.users.push(user);
    this.usersChanged.next(this.users.slice());
    this.callSaveUsersService();
  }

  updateUser (index: number, user: User) {
    this.users[index] = user;
    this.usersChanged.next(this.users.slice());
    this.callSaveUsersService();
  }

  deleteUser (index: number) {
    this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
    this.callSaveUsersService();
  }

  callSaveUsersService () {
    this.subscription = this.saveUsersToService()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  saveUsersToService () {
    return this.http.put(this.userDataURL, this.getUsers())
      .map((response: Response) => {
        return response.json();
      })
      .catch((error) => {
        return Observable.throw('There was an error while saving data')
      });
  }

  fetchUsersFromService () {
    return this.http.get(this.userDataURL)
      .map((response: Response) => {
        const users: User[] = response.json();
        return users;
      })
      .subscribe(
        (users: User[]) => {
          this.setUsers(users);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setUsers (users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }
}
