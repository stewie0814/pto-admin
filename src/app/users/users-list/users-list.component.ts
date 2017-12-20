import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  subscription: Subscription;
  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.subscription = this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );

    this.usersService.fetchUsersFromService();
  }

}
