import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { ColDef,ValueFormatterParams } from 'ag-grid-community';
import { ToggleRendererComponent } from 'src/app/inventory/toggle-renderer.component';
import { EditActionRendererComponent } from 'src/app/inventory/edit-action-renderer.component';
import { RemoveActionRendererComponent } from 'src/app/inventory/remove-action-renderer.component';
import { ConfirmationService } from 'src/app/confirmation-pop/confirmation.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css']
})
export class ManageJobsComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getJobs();
  }

  // Define column definitions using the ColDef type for better IntelliSense.
  columnDefs: ColDef[] = [
    { headerName: 'Edit', field: 'edit', cellRendererFramework: EditActionRendererComponent, width: 80,
      cellRendererParams: {
        onEdit: this.onEditAction.bind(this), // Pass the method reference
      },
     },
    { headerName: 'Job Name', field: 'jobTitle', sortable: true, filter: true ,width:200 },
    { headerName: 'Location', field: 'location', sortable: true, filter: true ,width:200 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true,width:350,},
    { headerName: 'Posted On ', field: 'createdOn', sortable: true, filter: true,width:200 ,
      valueFormatter: (params: ValueFormatterParams): string =>
        new DatePipe('en-US').transform(params.value, 'dd-MM-yy hh:mm a') ?? '-----',
    },
    { headerName: 'Remove', field: 'Remove', cellRendererFramework: RemoveActionRendererComponent, width: 100,
      cellRendererParams: {
        onDelete: this.onDeleteAction.bind(this), // Pass the method reference
      },
     },
  ];
  rowData:any=[];
  getJobs(){
    this.loading=true;
    this.commonService.getData('/jobs').subscribe({
      next: (response: any) => {
        console.log("data , ",response)
          this.rowData = response;
          this.loading=false;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.loading=false;
      }
    });
  }

  loading:boolean=false;
  SubmitForm() {
    if(!this.JobTitle || !this.Location  || !this.Description) {
      this.toastr.warning("Enter all the fields","Warning");
      return;
    }
    this.loading=true;
    console.log('Form submitted:', this.JobTitle, this.Location, this.Description);
    if(this.IsAdd){//Add a new job
      let data={
        jobTitle:this.JobTitle, 
        location:this.Location,
        description:this.Description
      }
      this.commonService.postData('/jobs', data).subscribe({
        next: (response: any) => {
          if (response?.status === 201) {
            this.toastr.success('The Job Created Successfully', 'Success');
            this.CancelForm();
            this.getJobs();
            this.IsAdd=false;
          } 
          this.loading=false;
        },
        error: (error) => {
          this.toastr.error(error?.message || 'Something went wrong!', 'Error');
          this.loading=false;
        }
        
      });
      
    }
    if(this.IsEdit){//Edit a job
      let data={
        jobId:this.jobId, 
        jobTitle:this.JobTitle, 
        location:this.Location,
        description:this.Description
      }
      this.commonService.putData('/jobs/update', data).subscribe({
        next: (response: any) => {
          if (response?.status === 200 || response?.status === 201) {
            this.toastr.success('The Job Updated Successfully', 'Success');
            this.CancelForm();
            this.getJobs();
            this.IsEdit=false;
          } 
          this.loading=false;
        },
        error: (error) => {
          this.toastr.error(error?.message || 'Something went wrong!', 'Error');
          this.loading=false;
          this.IsEdit=false;
        }
      
      });
  }
}
  
  
  jobId:any;JobTitle:any;Location:any;Description:any;errorMessage: string = '';
  onEditAction(rowData: any) {
    this.IsEdit=true; 
    this.JobTitle=rowData.jobTitle;
    this.Location=rowData.location;
    this.Description=rowData.description;
    this.jobId=rowData._id;
    console.log('Edit action received in parent:', rowData);
    console.log('Edit action received in parent:this.IsEdit', this.IsEdit);
    // Handle the received row data (e.g., open a modal, update a form, etc.)
  }
  IsAdd:boolean=false;
  IsEdit:boolean=false;
  addToggle(){
    this.IsAdd=!this.IsAdd;
  }
  CancelForm(){
    this.IsAdd=false;
    this.IsEdit=false;
    this.JobTitle=null;
    this.Location=null;
    this.Description=null;
  }
  onDeleteAction(rowData: any) {
    this.jobId=rowData._id;
    this.onDeleteJob();
  }
  // conf modal 
  onDeleteJob(): void {
    this.confirmationService.showConfirmation({
      confType: 'warn',
      confHeader: 'Delete Job',
      confBody: 'Are you sure you want to delete this Job?',
      confCancel: 'Cancel',
      confSubmit: 'Delete'
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.loading=true;
      this.commonService.deleteData('/jobs/delete', { jobId: this.jobId}).subscribe({
        next: (response) => {
          if (response?.status === 200) {
            this.toastr.success('The Job Removed Successfully', 'Success');
            this.CancelForm();
            this.getJobs();
          } 
          this.loading=false;
        },
        error: (error) => {
          this.toastr.error(error?.message || 'Something went wrong!', 'Error');
          this.loading=false;
        }
      });
      
        console.log('Job deleted');
      } else {
        console.log('Delete action cancelled');
      }
    });
  }
  
}
