import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Subscription } from 'rxjs/Subscription';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  employees: Employee[] = [];

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.subscription = this.employeesService.employeesChanged.subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      }
    );

    this.employeesService.fetchEmployeesFromService();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
