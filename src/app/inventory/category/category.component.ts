import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { ToggleRendererComponent } from '../toggle-renderer.component';
import { EditActionRendererComponent } from '../edit-action-renderer.component';
import { RemoveActionRendererComponent } from '../remove-action-renderer.component';
import { ConfirmationService } from 'src/app/confirmation-pop/confirmation.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(
    private commonService: CommonService,
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
    { headerName: 'Category Name', field: 'category', sortable: true, filter: true ,width:200,maxWidth:230 },
    { headerName: 'Size Unit', field: 'sizeunit', sortable: true, filter: true },
    { headerName: 'Size', field: 'size', sortable: true, filter: true },
    {
      headerName: 'Enable/Disable',
      field: 'enabled',
      cellRendererFramework: ToggleRendererComponent, // Use the Angular component
      width: 150
    },
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
    category: `Item 1876887669${i + 1}`,
    sizeunit: "meters",
    size: 10,
    description: `Description for Item ${i + 1}`,
    enabled: false // Default to false (disabled)
  }));
  
  
  onToggleChange(event: any, rowIndex: number) {
    this.rowData[rowIndex].enabled = event.checked;
    console.log(`Row ${rowIndex + 1} enabled: ${event.checked}`);
  }
  
  
  CategoryName:any;SizeUnit:any;Size:any;Description:any;
  onEditAction(rowData: any) {
    this.IsEdit=true; 
    this.CategoryName=rowData.category;
    this.SizeUnit=rowData.sizeunit;
    this.Size=rowData.size;
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
    this.CategoryName=null;
    this.SizeUnit=null;
    this.Size=null;
    this.Description=null;
  }
  onDeleteAction(rowData: any) {
    this.onDeleteCategory();
  }
  // conf modal 

  
  onDeleteCategory(): void {
    this.confirmationService.showConfirmation({
      confType: 'warn',
      confHeader: 'Delete Category',
      confBody: 'Are you sure you want to delete this category?',
      confCancel: 'Cancel',
      confSubmit: 'Delete'
    }).subscribe((confirmed) => {
      if (confirmed) {
        // Perform category deletion logic here
        console.log('Category deleted');
      } else {
        console.log('Delete action cancelled');
      }
    });
  }
}
