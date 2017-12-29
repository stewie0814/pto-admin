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

  getTeam(teamId: number) {
    let result = this.teams.find( (team) => {
      return team.teamId === teamId;
    });

    return result;
  }

  findTeamIndex (teamId: number) {
    return this.teams.indexOf(this.getTeam(teamId));
  }

  addTeam (team: Team) {
    this.teams.push(team);
    this.teamsChanged.next(this.teams.slice());
  }

  updateTeam (teamId: number, team: Team) {
    this.teams[this.findTeamIndex(teamId)] = team;
    this.teamsChanged.next(this.teams.slice());
  }

  deleteTeam (teamId: number) {
    this.teams.splice(this.findTeamIndex(teamId), 1);
    this.teamsChanged.next(this.teams.slice());
  }
}
