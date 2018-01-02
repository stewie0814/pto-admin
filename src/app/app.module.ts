import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';

// Services
import { UsersService } from './users/users.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamsListComponent } from './teams/teams-list/teams-list.component';
import { TeamsService } from './teams/teams.service';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    UsersListComponent,
    UsersEditComponent,
    UserDetailComponent,
    TeamsComponent,
    TeamsListComponent,
    TeamEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    UsersService,
    TeamsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
