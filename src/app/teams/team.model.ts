export class Team {
  public teamId: number = 0;
  public name: string = '';
  public adminId: number = 0;

  constructor (teamId: number, name: string, adminId: number) {
    this.teamId = teamId;
    this.name = name;
    this.adminId = adminId;
  }
}
