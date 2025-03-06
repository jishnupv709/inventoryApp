import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { JobActionRendererComponent } from './job-actionrenderer.component';
import { ConfirmationService } from 'src/app/confirmation-pop/confirmation.service';

@Component({
  selector: 'app-apply-jobs',
  templateUrl: './apply-jobs.component.html',
  styleUrls: ['./apply-jobs.component.css']
})
export class ApplyJobsComponent implements OnInit {

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
    { headerName: 'Job Name', field: 'JobTittle', sortable: true, filter: true ,width:200,maxWidth:230 },
    { headerName: 'Location', field: 'Location', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true,width:350,maxWidth:430 },
    {
      headerName: 'Apply',
      field: 'Apply',
      cellRendererFramework: JobActionRendererComponent,
      cellRendererParams: {
        onApply: this.onApplyAction.bind(this), // Pass method reference
      },
      flex:1
    }
    
    
  ];

  // Define some dummy row data.
  rowData = Array.from({ length: 60 }, (_, i) => ({
    no: i + 1,
    JobTittle: `Item 1876887669${i + 1}`,
    Location: "Kochi",
    description: `Description for Item ${i + 1}`,
    enabled: false // Default to false (disabled)
  }));
  
  onApplyAction(rowData: any) {
    console.log("rowdata", rowData.no);
    this.router.navigate(['/job-details'], { queryParams: { id: rowData.no } });
}

}
