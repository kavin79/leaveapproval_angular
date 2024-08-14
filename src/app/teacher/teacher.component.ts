import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { leaverequest} from '../interfaces/leaverequest';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
leaverequests : leaverequest[];
approvedRejectedRequests: leaverequest[];
showPendingRequests: boolean = false;
showApprovedRequests: boolean = false;
private currentUserSubject: BehaviorSubject<any>;
public currentUser: Observable<any>;
  constructor(private service : LoginService,private route : Router) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
   
  }
  showPending(): void {
    this.showPendingRequests = true;
    this.showApprovedRequests = false;
    this.getPendingLeaveRequests();
  }
  showApprovedRejected(): void {
    this.showPendingRequests = false;
    this.showApprovedRequests = true;
    this.getapprovedorrejectedrequests();
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('teacher');
    this.currentUserSubject.next(null);
    this.route.navigate(['/login']);
  }
  
  approveLeaveRequest(requestId: number): void {
   
    const teacher = localStorage.getItem('teacher');
    this.service.getteacheridfromusername(teacher).subscribe(
      (teacherId: number) => {
        this.service.approveLeaveRequest(requestId, teacherId).subscribe(
          () => {
            alert('approved');
            this.getPendingLeaveRequests();

          },
          error => {
            alert('failed');
          }
        );
      },
      error => {
        console.error('Error fetching teacher ID:', error);
      }
    );
  }


  rejectLeaveRequest(requestId: number, teacherId: number): void {
    const teacher = localStorage.getItem('teacher');
    this.service.getteacheridfromusername(teacher).subscribe(
      (teacherId: number) => {
        this.service.rejectLeaveRequest(requestId, teacherId).subscribe(
          () => {
            alert('rejected');
            this.getPendingLeaveRequests();
          },
          error => {
            alert('failed');
          }
        );
      },
      error => {
        console.error('Error fetching teacher ID:', error);
      }
    );
  }

  getapprovedorrejectedrequests(){
    const teacher = localStorage.getItem('teacher');
    this.service.getteacheridfromusername(teacher).subscribe(
      (teacherId: number) => {
        this.service.getapprovedorrejected(teacherId).subscribe(
          (data : leaverequest[]) => {
             this.approvedRejectedRequests = data;
          },
          error => {
            alert('failed');
          }
        );
      },
      error => {
        console.error('Error fetching teacher ID:', error);
      }
    );
  }

  getPendingLeaveRequests() {
    debugger;
    this.service.getPendingLeaveRequests().subscribe(
      (data : leaverequest[]) => {
        this.leaverequests = data;
      },
      (error) => {
        console.error('Error fetching leave requests:', error);
      }
    );
  }

}
