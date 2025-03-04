import { Component, EventEmitter, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-remove-action-renderer',
  template: `
    <button mat-icon-button matTooltip="Remove item" (click)="onRemoveClick()">
      <mat-icon color="warn">delete</mat-icon>
    </button>
  `,
  styles: []
})
export class RemoveActionRendererComponent implements ICellRendererAngularComp {
  params: any;

  @Output() remove = new EventEmitter<any>(); // EventEmitter for remove action

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onRemoveClick() {
    console.log('Remove clicked for row:', this.params.data);
    this.remove.emit(this.params.data); // Emit row data to the parent
    if (this.params.onDelete) {
      this.params.onDelete(this.params.data); // Call the passed function directly
    }
  }
}
