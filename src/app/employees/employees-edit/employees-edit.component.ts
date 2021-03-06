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
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'],
          this.isEditing = params['id'] != null,
          this.initForm();
        }
      );
  }

  initForm() {
    let uuid = '';
    let name = '';
    let firstLastName = '';
    let secondLastName = '';

    if (this.isEditing) {
      // Stuff for when we're editing a employee
      const tempEmployee = this.employeesService.getEmployee(this.id);
      uuid = tempEmployee.uuid;
      name = tempEmployee.name;
      firstLastName = tempEmployee.firstLastName;
      secondLastName = tempEmployee.secondLastName;
    }

    this.employeeForm = new FormGroup({
      uuid: new FormControl(uuid),
      name: new FormControl(name, Validators.required),
      firstLastName: new FormControl(firstLastName, Validators.required),
      secondLastName: new FormControl(secondLastName, Validators.required)
    });
  }

  onEmployeeSubmit() {
    if (this.isEditing) {
      this.employeesService.updateEmployee(this.id, this.employeeForm.value);
      this.router.navigate(['/employees/' + this.id]);
    } else {
      this.employeesService.addEmployee(this.employeeForm.value);
      this.router.navigate(['../'], { relativeTo: this.activatedRoute});
    }

  }

}
