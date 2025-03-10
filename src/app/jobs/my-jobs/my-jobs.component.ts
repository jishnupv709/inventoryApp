import { Component, HostListener, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { ColDef, ColumnApi, GridApi, ValueFormatterParams } from 'ag-grid-community';
import { ConfirmationService } from 'src/app/confirmation-pop/confirmation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getMyJobs();
  }

  // Define column definitions using the ColDef type for better IntelliSense.
  columnDefs: ColDef[] = [
    { headerName: 'No', sortable: true, filter: true,width:80,
    valueGetter: (params) => ((params.node?.rowIndex ?? 0) + 1).toString(),
   },
    { headerName: 'Job Name', field: 'jobTitle', sortable: true, filter: true ,width:200 },
    { headerName: 'Location', field: 'location', sortable: true, filter: true,width:200 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true,width:350},
    { headerName: 'Applied On ', field: 'createdOn', sortable: true, filter: true,width:200 ,
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
  getMyJobs(){
    this.loading=true;
    this.commonService.getData('/jobs/applications/user').subscribe({
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
