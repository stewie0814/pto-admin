import { User } from './user.model';
import { Http, Response } from '@angular/http';

export class UsersService {

  private users: User[];

  constructor(private http: Http) {
    
  }
}
