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
              private activatedRoute: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit() {
    if (this.usersService.getUsers().length <= 0) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    } else {
      this.activatedRoute.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'],
            this.isEditing = params['id'] != null,
            this.initForm();
          }
        );
    }
  }

  initForm() {
    let name = '';
    let firstLastName = '';
    let secondLastName = '';
    let joinDate = '';
    let teamId = 0;

    if (this.isEditing) {
      // Stuff for when we're editing a user
      const tempUser = this.usersService.getUser(this.id);
      name = tempUser.name;
      firstLastName = tempUser.firstLastName;
      secondLastName = tempUser.secondLastName;
      joinDate = tempUser.joinDate;
      teamId = tempUser.teamId;
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
    if (this.isEditing) {
      this.usersService.updateUser(this.id, this.userForm.value);
    } else {
      this.usersService.addUser(this.userForm.value);
    }
  }

}
