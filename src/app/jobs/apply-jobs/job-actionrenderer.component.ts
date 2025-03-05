import { Component, EventEmitter, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-job-action-renderer',
  template: `
    <button mat-icon-button matTooltip="Apply for this Job" (click)="onApplyClick()">
      <mat-icon>launch</mat-icon>
    </button>
  `,
  styles: []
})
export class JobActionRendererComponent implements ICellRendererAngularComp {
  params: any;

  @Output() apply = new EventEmitter<any>(); // EventEmitter for apply action

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onApplyClick() {
    console.log('Apply clicked for row:', this.params.data);
    this.apply.emit(this.params.data); // Emit row data to the parent
    if (this.params.onApply) {
      this.params.onApply(this.params.data); // Call the passed function directly
    }
  }
}
