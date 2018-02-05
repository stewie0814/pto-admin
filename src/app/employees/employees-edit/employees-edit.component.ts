import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.css']
})
export class EmployeesEditComponent implements OnInit {
  id: number;
  employeeForm: FormGroup;
  isEditing: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private employeesService: EmployeesService) { }

  ngOnInit() {
    if (this.employeesService.getEmployees().length <= 0) {
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
      // Stuff for when we're editing a employee
      const tempEmployee = this.employeesService.getEmployee(this.id);
      name = tempEmployee.name;
      firstLastName = tempEmployee.firstLastName;
      secondLastName = tempEmployee.secondLastName;
      joinDate = tempEmployee.joinDate;
      teamId = tempEmployee.teamId;
    }

    this.employeeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      firstLastName: new FormControl(firstLastName, Validators.required),
      secondLastName: new FormControl(secondLastName, Validators.required),
      joinDate: new FormControl(joinDate, []),
      teamId: new FormControl(teamId, [])
    });
  }

  onEmployeeSubmit() {
    if (this.isEditing) {
      this.employeesService.updateEmployee(this.id, this.employeeForm.value);
    } else {
      this.employeesService.addEmployee(this.employeeForm.value);
    }
  }

}
