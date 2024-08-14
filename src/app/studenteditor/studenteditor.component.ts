import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studenteditor',
  templateUrl: './studenteditor.component.html',
  styleUrls: ['./studenteditor.component.scss']
})
export class StudenteditorComponent implements OnInit {

  leaveRequests: any[];
  constructor(private service : LoginService,private route : Router) { }

  ngOnInit(): void {
  }

  goBack(){
    this.route.navigate(['/student']);
  }
  

  submit(reason : any) : void{
 
    const username = localStorage.getItem('username');
    if (!username) {
      console.error('Username not found in local storage');
      return;
    }

    this.service.getstudentidfromusername(username).subscribe(
      (studentId: number) => {
        this.service.submitLeaveRequest(reason, studentId).subscribe(
          () => {
            console.log('Leave request submitted successfully');
          },
          (error) => {
            console.error('Error submitting leave request:', error);
          }
        );
      },
      (error) => {
        console.error('Error getting student ID:', error);
      }
    );

  }

}
