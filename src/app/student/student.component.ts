import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { leaverequest } from '../interfaces/leaverequest';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  leaveRequests: any[];
  reason: string;
  approverId : number;
  requestid : number;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private service : LoginService,private route : Router) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
    this.getPendingLeaveRequests();
    
  }


  gotoadd(){
     this.route.navigate(['/studenteditor']);
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    this.currentUserSubject.next(null);
    this.route.navigate(['/login']);
  }

  editRequest(requestid : number) {
    // Set the request ID and reason for editing
    this.route.navigate(['/requestupdate', requestid]);
    
  }

  updateRequest(): void {
    this.service.update(this.requestid, this.reason)
      .subscribe(
        () => {
          alert('Leave request updated successfully:');
          // Handle success
        },
        error => {
          alert('Error updating leave request:');
          // Handle error
        }
      );
  }
  

  getPendingLeaveRequests() {
    
    const username = localStorage.getItem('username');  
  this.service.getstudentidfromusername(username).subscribe(
    (studentid) => {
      // console.log(studentid);
      this.service.getleavedata(studentid).subscribe(
        (data) => {
          this.leaveRequests = data.sort((a, b) => b.requestId - a.requestId);
        },
        (error) => {
          console.error('Error fetching leave requests:', error);
        }
      );
    },
    (error) => {
      console.error('Error fetching student ID:', error);
    }
  );
  }

}
