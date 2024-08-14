import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { leaverequest } from '../interfaces/leaverequest';

@Component({
  selector: 'app-studentupdate',
  templateUrl: './studentupdate.component.html',
  styleUrls: ['./studentupdate.component.scss']
})
export class StudentupdateComponent implements OnInit {
  requestId: number;
  requestDetails: leaverequest[];

  constructor(private route: ActivatedRoute, private service: LoginService,private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.requestId = params['id']; // Get the request ID from route parameters
      this.getRequestDetails(this.requestId); // Fetch request details based on ID
    });
  }

  getRequestDetails(reqid : number){
    this.service.getrequestdata(reqid).subscribe((details)=>{
      this.requestDetails = details;
    },error => {
      console.error('Error fetching request details:', error);
      // Handle error
    });
  }

  updateRequest(): void {
    if (this.requestDetails && this.requestDetails.length > 0) {
      const reason = this.requestDetails[0].reason;
      // Call the service method to update the request with the extracted reason
      this.service.update(this.requestId, reason).subscribe(
        () => {
          alert('Leave request updated successfully');
          this.router.navigate(['/student']);
          // Optionally, navigate back to student component or perform any other action
        },
        (error) => {
          console.error('Error updating leave request:', error);
        }
      );
    } else {
      console.error('Request details are not available.');
      // Handle error or show appropriate message
    }
  }
  

}
