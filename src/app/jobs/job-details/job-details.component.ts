import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { ConfirmationService } from 'src/app/confirmation-pop/confirmation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
      private router: Router,
      private confirmationService: ConfirmationService,
      private commonService: CommonService,
          private toastr: ToastrService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.jobId = params['id'];
      this.getJobDetails();
    });
  }
  jobId:any;jobTitle:any;location:any;description:any;postedOn:any;loading:boolean=false;
  getJobDetails(){
    this.loading=true;
    let data={
      jobId:this.jobId
    }
    this.commonService.postData('/jobs/details',data).subscribe({
      next: (response: any) => {
        console.log("data , ",response)
        console.log("response",response);
        this.jobId=response.body._id;
        this.jobTitle=response.body.jobTitle;
        this.location=response.body.location;
        this.description=response.body.location;
        this.postedOn=new Date(response.body.createdOn)
          this.loading=false;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.loading=false;
      }
    });
  }
  onApply(): void {
    console.log('Apply clicked for job:', this.jobId);
    this.confirmationService.showConfirmation({
      confType: 'info',
      confHeader: 'ob Application Submisssion',
      confBody: 'Are you sure you want to apply for this Job?',
      confCancel: 'Cancel',
      confSubmit: 'Submit'
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.loading=true;
        let data={
          jobId:this.jobId
        }
      this.commonService.postData('/jobs/apply',data).subscribe({
        next: (response) => {
          if (response?.status === 201) {
            this.toastr.success('Applied for the Job Successfully', 'Success');
            this.router.navigate(['/apply-jobs']); 
          } 
          this.loading=false;
        },
        error: (error) => {
          this.toastr.error(error?.message || 'Something went wrong!', 'Error');
          this.loading=false;
        }
      });
        console.log('Job Applied');
      } else {
        console.log('aqpplication cancelled');
      }
    });
  }

  goBack() {
    this.router.navigate(['/apply-jobs']); 
  }
  
}
