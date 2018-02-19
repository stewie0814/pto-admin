import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CalendarModule } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarUtilsModule } from './calendar/calendar-utils/module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EmployeesEditComponent } from './employees/employees-edit/employees-edit.component';

// Services
import { EmployeesService } from './employees/employees.service';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventsComponent } from './calendar/events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeesComponent,
    EmployeesListComponent,
    EmployeesEditComponent,
    EmployeeDetailComponent,
    CalendarComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot(),
    HttpModule,
    NgbModalModule.forRoot(),
    CalendarUtilsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [
    EmployeesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
