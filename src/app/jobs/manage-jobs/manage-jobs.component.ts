import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { ToggleRendererComponent } from 'src/app/inventory/toggle-renderer.component';
import { EditActionRendererComponent } from 'src/app/inventory/edit-action-renderer.component';
import { RemoveActionRendererComponent } from 'src/app/inventory/remove-action-renderer.component';
import { ConfirmationService } from 'src/app/confirmation-pop/confirmation.service';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css']
})
export class ManageJobsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  // Define column definitions using the ColDef type for better IntelliSense.
  columnDefs: ColDef[] = [
    { headerName: 'Edit', field: 'edit', cellRendererFramework: EditActionRendererComponent, width: 80,
      cellRendererParams: {
        onEdit: this.onEditAction.bind(this), // Pass the method reference
      },
     },
    { headerName: 'Job Name', field: 'JobTittle', sortable: true, filter: true ,width:200,maxWidth:230 },
    { headerName: 'Location', field: 'Location', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, flex: 1 },
    { headerName: 'Remove', field: 'Remove', cellRendererFramework: RemoveActionRendererComponent, width: 90,
      cellRendererParams: {
        onDelete: this.onDeleteAction.bind(this), // Pass the method reference
      },
     },
  ];

  // Define some dummy row data.
  rowData = Array.from({ length: 60 }, (_, i) => ({
    no: i + 1,
    JobTittle: `Item 1876887669${i + 1}`,
    Location: "Kochi",
    description: `Description for Item ${i + 1}`,
    enabled: false // Default to false (disabled)
  }));
  
  
  onToggleChange(event: any, rowIndex: number) {
    this.rowData[rowIndex].enabled = event.checked;
    console.log(`Row ${rowIndex + 1} enabled: ${event.checked}`);
  }
  
  
  JobTittle:any;Location:any;Description:any;
  onEditAction(rowData: any) {
    this.IsEdit=true; 
    this.JobTittle=rowData.JobTittle;
    this.Location=rowData.Location;
    this.Description=rowData.description;
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
    this.JobTittle=null;
    this.Location=null;
    this.Description=null;
  }
  onDeleteAction(rowData: any) {
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
        // Perform Job deletion logic here
        console.log('Job deleted');
      } else {
        console.log('Delete action cancelled');
      }
    });
  }
}
