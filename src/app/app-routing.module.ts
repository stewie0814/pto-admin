import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EmployeesEditComponent } from './employees/employees-edit/employees-edit.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { CalendarComponent } from './calendar/calendar.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'employees', component: EmployeesComponent, children: [
    { path: 'employees-list', component: EmployeesListComponent },
    { path: 'new', component: EmployeesEditComponent },
    { path: ":id", component: EmployeeDetailComponent },
    { path: ':id/edit', component: EmployeesEditComponent }
  ]},
  { path: 'calendar', component: CalendarComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
