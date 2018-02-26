import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeesService } from '../employees.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee = new Employee('', '', '', '');
  id: number;

  constructor(private employeesService: EmployeesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.employeesService.getEmployees().length <=0 ) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    } else  {
      this.activatedRoute.params
        .subscribe(
          (params: Params) => {
            this.id = +params["id"];
            this.employee = this.employeesService.getEmployee(this.id);
          }
        );
    }
  }

  onEditEmployee() {
    this.router.navigate(['/employees', this.id, 'edit']);
  }

  onDeleteEmployee() {
    if(confirm('Are you sure you wish to delete this employee?')) {
      this.employeesService.deleteEmployee(this.id);
      this.router.navigate(['/employees']);
    }
  }

}
