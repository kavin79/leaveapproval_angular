import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from "./student/student.component";
import { StudentupdateComponent } from "./studentupdate/studentupdate.component";
import { TeacherComponent } from "./teacher/teacher.component";
import {StudenteditorComponent} from "./studenteditor/studenteditor.component";
import { AuthGuard } from './interceptor/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path : 'login', component : LoginComponent},
  {path : 'student', component : StudentComponent, canActivate : [AuthGuard]},
  {path : 'teacher', component : TeacherComponent,canActivate : [AuthGuard]},
  {path : 'studenteditor', component : StudenteditorComponent,canActivate : [AuthGuard]},
  {path : 'requestupdate',component : StudentupdateComponent, canActivate : [AuthGuard]},
  { path: 'requestupdate/:id', component: StudentupdateComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
