import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'src/app/confirmation-pop/confirmation.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobId: string | null = null;
  jobTitle: string = 'Senior Software Engineer';
  location: string = 'San Francisco, CA';
  description: string = `We are seeking a highly skilled Senior Software Engineer to join our dynamic team. 
                         In this role, you'll be responsible for developing and maintaining scalable applications 
                         and leading code reviews.`;
  postedOn: Date = new Date('2025-02-25T10:00:00');

  constructor(private route: ActivatedRoute,
      private router: Router,
      private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.jobId = params['id'];
      // Optionally fetch real job data based on jobId
    });
  }

  onApply(): void {
    console.log('Apply clicked for job:', this.jobId);
    // Navigate or open application form
    this.confirmationService.showConfirmation({
      confType: 'info',
      confHeader: 'Job Application Submisssion',
      confBody: 'Are you sure you want to apply for this job?',
      confCancel: 'Cancel',
      confSubmit: 'Submit'
    }).subscribe((confirmed) => {
      if (confirmed) {
        // Perform category deletion logic here
        console.log('Category deleted');
      } else {
        console.log('Delete action cancelled');
      }
    });
  }

  goBack() {
    this.router.navigate(['/apply-jobs']); 
  }
  
}
