export class Employee {
  public uuid: string = '';
  public name: string = '';
  public firstLastName: string = '';
  public secondLastName: string = '';

  constructor(uuid: string, name: string, firstLastName: string, secondLastName: string) {
    this.name = name;
    this.firstLastName = firstLastName;
    this.secondLastName = secondLastName;
  }
}
