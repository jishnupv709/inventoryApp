import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { ConfirmationService } from 'src/app/confirmation-pop/confirmation.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  // Define column definitions using the ColDef type for better IntelliSense.
  columnDefs: ColDef[] = [
    { headerName: 'No', field: 'no', sortable: true, filter: true,width:100 },
    { headerName: 'Job Name', field: 'JobTittle', sortable: true, filter: true ,width:200,maxWidth:230 },
    { headerName: 'Location', field: 'Location', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true,width:280,maxWidth:300},
    { headerName: 'Applied On', field: 'CreatedOn', sortable: true, filter: true, flex: 1,  },
    
  ];

  // Define some dummy row data.
  rowData = Array.from({ length: 60 }, (_, i) => ({
    no: i + 1,
    JobTittle: `Item 1876887669${i + 1}`,
    Location: "Kochi",
    description: `Description for job gfdfqwygfdyqwfd ${i + 1}`,
    CreatedOn: `11-01-2017`,
    enabled: false // Default to false (disabled)
  }));
  
  
}
