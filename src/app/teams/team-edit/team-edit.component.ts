import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  id: string = '';
  teamForm: FormGroup;
  isEditing: boolean = false;

  constructor(private teamsService: TeamsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params(
      (params: Params) => {
        this.id = params['id'];
        this.isEditing = params['id'] != null;
        this.initForm();
      }
    )
  }

  onTeamSubmit() {
    console.log('wahoo');
  }

  initForm() {
    let teamName = '';
    let adminId = '';

    this.teamForm = new FormGroup({
      teamName: new FormControl(teamName, Validators.required),
      adminId: new FormControl(adminId)
    });
  }

}
