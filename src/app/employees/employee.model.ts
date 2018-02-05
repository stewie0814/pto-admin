export class Employee {
  public name: string = '';
  public firstLastName: string = '';
  public secondLastName: string = '';
  public joinDate: string = '';
  public teamId: number = 1;

  constructor(name: string, firstLastName: string, secondLastName: string, joinDate: string, teamId: number) {
    this.name = name;
    this.firstLastName = firstLastName;
    this.secondLastName = secondLastName;
    this.joinDate = joinDate;
    this.teamId = teamId;
  }
}
