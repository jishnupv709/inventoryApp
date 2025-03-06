import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { ConfirmationService } from 'src/app/confirmation-pop/confirmation.service';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  // Define column definitions using the ColDef type for better IntelliSense.
  columnDefs: ColDef[] = [
    { headerName: 'No', field: 'no', sortable: true, filter: true,width:100 },
    { headerName: 'Applicant Name', field: 'AppliedUser', sortable: true, filter: true,},
    { headerName: 'Email', field: 'Email', sortable: true, filter: true,},
    { headerName: 'Job Name', field: 'JobTittle', sortable: true, filter: true , },
    { headerName: 'Location', field: 'Location', sortable: true, filter: true },
    // { headerName: 'Description', field: 'description', sortable: true, filter: true,width:200},
    { headerName: 'Applied Date', field: 'CreatedOn', sortable: true, filter: true,flex:1},
    
  ];

  // Define some dummy row data.
  rowData = Array.from({ length: 60 }, (_, i) => ({
    no: i + 1,
    AppliedUser:`User Name${i + 1}`,
    Email: "username@example.com",
    JobTittle: `Item 1876887669${i + 1}`,
    Location: "Kochi",
    description: `Description for Item ${i + 1}`,
    CreatedOn: `11-01-2024`,
    enabled: false // Default to false (disabled)
  }));
  
  
}
