import { Team } from './team.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Injectable()
export class TeamsService {
  private teams: Team[] = [];
  teamsChanged = new Subject<Team[]>();
  subscription: Subscription;
  teamDataURL = 'https://pto-admin.firebaseio.com/teams.json';

  constructor (private http: Http) {}

  getTeams () {
    return this.teams.slice();
  }

  getTeam(id: string) {
    let result = this.teams.find( (team) => {
      return team.id === id;
    });

    return result;
  }

  findTeamIndex (id: string) {
    return this.teams.indexOf(this.getTeam(id));
  }

  addTeam (team: Team) {
    this.teams.push(team);
    this.teamsChanged.next(this.teams.slice());
  }

  updateTeam (id: string, team: Team) {
    this.teams[this.findTeamIndex(id)] = team;
    this.teamsChanged.next(this.teams.slice());
  }

  deleteTeam (id: string) {
    this.teams.splice(this.findTeamIndex(id), 1);
    this.teamsChanged.next(this.teams.slice());
  }
}
