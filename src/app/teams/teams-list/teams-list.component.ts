import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from '../teams.service';
import { Team } from '../team.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit, OnDestroy {
  teams: Team[] = [];
  subscription: Subscription;

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    this.subscription = this.teamsService.teamsChanged.subscribe(
      (teams: Team[]) => {
        this.teams = teams;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
