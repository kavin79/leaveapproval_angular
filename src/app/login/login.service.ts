import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { leaverequest } from '../interfaces/leaverequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "https://localhost:7104/api";
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  username : string;
  password : string;
  constructor(private http : HttpClient,private route : Router) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  studentLogin(username: string, password: string): Observable<any> {
   
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(`${this.url}/Leave/studentlogin`, null, { params }).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  teacherLogin(username: string, password: string): Observable<any> {
    
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(`${this.url}/Leave/teacherlogin`, null, { params }).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.route.navigate(['/login']);
  }

  getToken() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}').token;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getPendingLeaveRequests(): Observable<leaverequest[]> {
    return this.http.get<leaverequest[]>(`${this.url}/Leave/pending`);
  }

  getapprovedorrejected(ApproverId : any): Observable<leaverequest[]> {
    return this.http.get<leaverequest[]>(`${this.url}/Leave/approvedorrejected?approverid=${ApproverId}`);
  }

 
  private handleError(error: any) {
          console.error('An error occurred:', error);
          return throwError('Something went wrong, please try again later.');
    }

    getstudentid(){
      localStorage.getItem('studentId');
    }

    getleavedata(studentid : any) : Observable<any[]> {
      return this.http.get<any[]>(`${this.url}/Leave/getleaverequestdata?studentId=${studentid}`);
    }

    getrequestdata(reqid : any) : Observable<any[]> {
      return this.http.get<any[]>(`${this.url}/Leave/getrequestdatafromreqid?reqid=${reqid}`);
    }

    getstudentidfromusername(username : any){
      return this.http.get(`${this.url}/Leave/getstudentidfromusername?username=${username}`);
    }

    getteacheridfromusername(username : any){
      return this.http.get(`${this.url}/Leave/getteacheridfromusername?username=${username}`);
    }

    approveLeaveRequest(requestId: number, teacherId: number): Observable<any> {
      return this.http.put(`${this.url}/Leave/approve/${requestId}?teacherId=${teacherId}`, {});
    }

    update(requestId: number, reason: string): Observable<any> {
      const params = new HttpParams().set('reason', reason);
  
      return this.http.put(`${this.url}/Leave/updaterequest/${requestId}`, null, { params });
    }

    rejectLeaveRequest(requestId: number, teacherId: number): Observable<any> {
      return this.http.put(`${this.url}/Leave/reject/${requestId}?teacherId=${teacherId}`, {});
    }

    submitLeaveRequest(reason: string, studentid : number): Observable<any> { 
      const url = `${this.url}/Leave/sendrequest`;    
      const queryParams = new HttpParams()
        .set('studentId', studentid.toString())
        .set('Reason', reason);
  
      return this.http.post<any>(url, null, { params: queryParams }).pipe(
        catchError(error => {
          console.error('Error submitting leave request:', error);
          return throwError(new Error('Failed to submit leave request'));
        })
      );
  
      }

  
}
