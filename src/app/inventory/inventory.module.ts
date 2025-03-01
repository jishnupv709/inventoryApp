import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { AgGridModule } from 'ag-grid-angular';

import { MatTabsModule } from '@angular/material/tabs';
import { InventoryRoutingModule } from './inventory-routing.module';
import { ItemMasterComponent } from './item-master/item-master.component';


@NgModule({
  declarations: [
    ItemMasterComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    FormsModule,
    RouterModule,
    MatTabsModule,
    AgGridModule,
  ]
})
export class InventoryModule { }
