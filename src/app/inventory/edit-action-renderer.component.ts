import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-edit-action-renderer',
  template: `
    <button mat-icon-button matTooltip="Edit item" (click)="onEditClick()">
      <mat-icon>launch</mat-icon>
    </button>
  `,
})
export class EditActionRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onEditClick() {
    console.log('Edit clicked for row:', this.params.data);
    if (this.params.onEdit) {
      this.params.onEdit(this.params.data); // Call the passed function directly
    }
  }
}
