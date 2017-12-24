import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = new User('', '', '', '', 0);
  id: number;

  constructor(private usersService: UsersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.usersService.getUsers().length <=0 ) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    } else  {
      this.activatedRoute.params
        .subscribe(
          (params: Params) => {
            this.id = +params["id"];
            this.user = this.usersService.getUser(this.id);
          }
        );
    }
  }

  onEditUser() {
    this.router.navigate(['/users', this.id, 'edit']);
  }

  onDeleteUser() {
    if(confirm('Are you sure you wish to delete this user?')) {
      this.usersService.deleteUser(this.id);
      this.router.navigate(['/users']);
    }
  }

}
