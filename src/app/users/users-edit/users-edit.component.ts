import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
              private route: ActivatedRoute) { }

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

    console.log(this.userForm);
    this.userForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      firstLastName: new FormControl(firstLastName, Validators.required),
      secondLastName: new FormControl(secondLastName, Validators.required),
      joinDate: new FormControl(joinDate, []),
      teamId: new FormControl(teamId, [])
    });
    console.log(this.userForm);
  }

  onUserSubmit() {
    console.log(this.userForm);
  }

}
