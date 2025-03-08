import { Component, HostListener, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { ColDef, ColumnApi, GridApi, ValueFormatterParams } from 'ag-grid-community';
import { ConfirmationService } from 'src/app/confirmation-pop/confirmation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getApplications();
  }

  // Define column definitions using the ColDef type for better IntelliSense.
  columnDefs: ColDef[] = [
    { headerName: 'No', sortable: true, filter: true,width:100,
    valueGetter: (params) => ((params.node?.rowIndex ?? 0) + 1).toString(),
   },
    { headerName: 'Applicant Name', field: 'username', sortable: true, filter: true,width:200},
    { headerName: 'Email', field: 'email', sortable: true, filter: true,width:200},
    { headerName: 'Job Name', field: 'jobTitle', sortable: true, filter: true ,width:200 },
    { headerName: 'Location', field: 'location', sortable: true, filter: true,width:200 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true,width:350},
    { headerName: 'Applied On ', field: 'appliedOn', sortable: true, filter: true,width:200 ,
              valueFormatter: (params: ValueFormatterParams): string =>
                new DatePipe('en-US').transform(params.value, 'dd-MM-yy hh:mm a') ?? '-----',
    },
    { headerName: 'Posted On ', field: 'createdOn', sortable: true, filter: true,width:200 ,
      valueFormatter: (params: ValueFormatterParams): string =>
        new DatePipe('en-US').transform(params.value, 'dd-MM-yy hh:mm a') ?? '-----',
},
    
  ];

    onGridReady(params: any): void {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
      }
    
      // Optional: Resize columns when window resizes
      @HostListener('window:resize', ['$event'])
      onResize() {
        if (this.gridApi) {
          this.gridApi.sizeColumnsToFit();
        }
      }

  rowData:any=[];loading:boolean=false;
  getApplications(){
    this.loading=true;
    this.commonService.getData('/jobs/applications').subscribe({
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
  
  
}
