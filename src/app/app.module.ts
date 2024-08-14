import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudenteditorComponent } from './studenteditor/studenteditor.component'; 
import { LoginService } from './login/login.service';
import { AuthGuard } from './interceptor/auth.guard';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { StudentupdateComponent } from './studentupdate/studentupdate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    TeacherComponent,
    StudenteditorComponent,
    StudentupdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService,AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
