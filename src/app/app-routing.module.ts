import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'users', component: UsersComponent, children: [
    { path: 'users-list', component: UsersListComponent },
    { path: 'new', component: UsersEditComponent },
    { path: ":id", component: UserDetailComponent },
    { path: ':id/edit', component: UsersEditComponent }
  ]},
  { path: 'teams', component: TeamsComponent, children: [
    { path: 'new', component: TeamEditComponent },
    { path: ':id', component: TeamEditComponent },
    { path: ':id/edit', component: TeamEditComponent }
  ] }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
