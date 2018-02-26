import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Injectable()
export class EmployeesService {
  private employees: Employee[] = [];
  employeesChanged = new Subject<Employee[]>();
  subscription: Subscription;
  employeeDataURL = 'https://pto-admin.firebaseio.com/users.json';
  constructor ( private http: Http ) {}

  getEmployees () {
    return this.employees.slice();
  }

  getEmployee (index: number) {
    return this.employees[index];
  }

  getEmployeeUUIDIndex(uuid: string) {
    return this.employees.indexOf(this.employees.find(employee => employee.uuid === uuid));
  }

  getEmployeeByUUID(uuid: string) {
    return this.employees[this.getEmployeeUUIDIndex(uuid)];
  }

  addEmployee (employee: Employee) {
    employee.uuid = this.generateUUID();
    this.employees.push(employee);
    this.employeesChanged.next(this.employees.slice());
    this.callSaveEmployeesService();
  }

  updateEmployee (index: number, employee: Employee) {
    this.employees[index] = employee;
    this.employeesChanged.next(this.employees.slice());
    this.callSaveEmployeesService();
  }

  deleteEmployee (index: number) {
    this.employees.splice(index, 1);
    this.employeesChanged.next(this.employees.slice());
    this.callSaveEmployeesService();
  }

  callSaveEmployeesService () {
    this.subscription = this.saveEmployeesToService()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  saveEmployeesToService () {
    return this.http.put(this.employeeDataURL, this.getEmployees())
      .map((response: Response) => {
        return response.json();
      })
      .catch((error) => {
        return Observable.throw('There was an error while saving data')
      });
  }

  fetchEmployeesFromService () {
    return this.http.get(this.employeeDataURL)
      .map((response: Response) => {
          const employees: Employee[] = response.json() || [];
          return employees;
      })
      .subscribe(
        (employees: Employee[]) => {
          this.setEmployees(employees);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setEmployees (employees: Employee[]) {
    this.employees = employees;
    this.employeesChanged.next(this.employees.slice());
  }

  generateUUID() {
    return this.generateHash() + "-" + this.generateHash() + "-" +
           this.generateHash() + "-" + this.generateHash();
  }

  generateHash() {
    return Math.floor((1 + Math.random()) * 0x100000).toString(16).substring(1);
  }
}
