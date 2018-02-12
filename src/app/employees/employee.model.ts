export class Employee {
  public name: string = '';
  public firstLastName: string = '';
  public secondLastName: string = '';

  constructor(name: string, firstLastName: string, secondLastName: string) {
    this.name = name;
    this.firstLastName = firstLastName;
    this.secondLastName = secondLastName;
  }
}
