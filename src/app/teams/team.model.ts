export class Team {
  public id: string = '';
  public name: string = '';
  public adminId: number = 0;

  constructor (id: string, name: string, adminId: number) {
    this.id = id;
    this.name = name;
    this.adminId = adminId;
  }
}
