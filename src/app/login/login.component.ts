import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  userType: string = '';
  constructor(private service : LoginService, private router : Router) { }

  login() {
    if (this.userType === 'student') {
        this.service.studentLogin(this.username, this.password).subscribe(
        (response) => {
          // debugger;
          localStorage.setItem('username', this.username);
          
          alert("Student login successful");
          this.router.navigate(['/student']); 
        },
        (error) => {
          alert('Student login failed:'); 
        }
      );
    } else if (this.userType === 'teacher') {
      debugger;
      this.service.teacherLogin(this.username, this.password).subscribe(
        () => {
          localStorage.setItem('teacher', this.username);
          alert("Teacher login successful");
          this.router.navigate(['/teacher']); 
        },
        (error) => {
          alert('Teacher login failed:'); 
        }
      );
    }
    else{
      alert('Please select a role');
    }
  }
  

}
