import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-toggle-renderer',
  template: `
    <mat-slide-toggle 
      [checked]="params.value" 
      (change)="onToggleChange($event)"
      color="primary"
      class="custom-toggle">
    </mat-slide-toggle>
  `,
  styles: [`
    .custom-toggle.mat-mdc-slide-toggle.mat-primary {
      --mdc-switch-selected-track-color: #0d6efd; /* Blue color */
      --mdc-switch-selected-thumb-color: white;
      --mdc-switch-selected-icon-color: white;
      --mdc-switch-unselected-track-color: #ccc;
      --mdc-switch-unselected-thumb-color: #757575;
    }
  `]
})
export class ToggleRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onToggleChange(event: any) {
    this.params.node.setDataValue('enabled', event.checked);
    console.log(`Row ${this.params.node.rowIndex + 1} enabled: ${event.checked}`);
  }
}
