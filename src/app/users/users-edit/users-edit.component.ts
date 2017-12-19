import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  id: number;
  userForm: FormGroup;
  isEditing: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'],
          this.isEditing = params['id'] != null,
          this.initForm();
        }
      )
  }

  initForm() {
    let name = '';
    let firstLastName = '';
    let secondLastName = '';
    let joinDate = '';
    let teamId = 0;

    if (this.isEditing) {
      // STuff for when we're editing a user
    }

    this.userForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      firstLastName: new FormControl(firstLastName, Validators.required),
      secondLastName: new FormControl(secondLastName, Validators.required),
      joinDate: new FormControl(joinDate, []),
      teamId: new FormControl(teamId, [])
    });
  }

  onUserSubmit() {
    this.usersService.addUser(this.userForm.value)
  }

  onFetchData() {
    console.log(this.usersService.getUsers());
    this.usersService.fetchUsersFromService();
    setTimeout( () => {
      console.log(this.usersService.getUsers());
    }, 2000);
  }

}
