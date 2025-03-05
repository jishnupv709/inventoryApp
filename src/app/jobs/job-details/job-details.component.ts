import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
      private router: Router,) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.jobId = params['id'];
      // Optionally fetch real job data based on jobId
    });
  }

  onApply(): void {
    console.log('Apply clicked for job:', this.jobId);
    // Navigate or open application form
  }

  goBack() {
    this.router.navigate(['/apply-jobs']); 
  }
  
}
