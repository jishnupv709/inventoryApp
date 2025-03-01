import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemMasterComponent } from './item-master/item-master.component';

const routes: Routes = [
  // If you prefer an explicit path:
  { path: '', component: ItemMasterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
