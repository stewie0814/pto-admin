import { Employee } from '../../employees/employee.model';

export class Event {
  public employee: Employee;
  public description: string;
  public color: {};
  public startDate: Date;
  public endDate: Date;

  constructor(employee: Employee, description: string, color: {}, startDate: Date, endDate: Date) {
    this.employee = employee;
    this.description = description;
    this.color = color;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
