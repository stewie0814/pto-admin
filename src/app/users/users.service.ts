import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UsersService {
  private users: User[] = [];
  usersChanged = new Subject<User[]>();
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
    this.saveUsersToService()
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
