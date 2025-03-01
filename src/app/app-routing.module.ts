import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  // Redirect the base URL to the login page (within the AuthModule)
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  
  // Lazy-load the AuthModule for all 'auth' routes
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
  // If no route is matched at the app level, redirect to the 404 page inside AuthModule
  { path: '**', redirectTo: 'auth/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
