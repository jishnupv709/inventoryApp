import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'; 

import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemMasterComponent } from './inventory/item-master/item-master.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageJobsComponent } from './jobs/manage-jobs/manage-jobs.component';
import { ApplyJobsComponent } from './jobs/apply-jobs/apply-jobs.component';
import { MyJobsComponent } from './jobs/my-jobs/my-jobs.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { JobApplicationsComponent } from './jobs/job-applications/job-applications.component';


const routes: Routes = [
  // Redirect the base URL to the login page (within the AuthModule)
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'inventory-master', component: ItemMasterComponent , canActivate: [AuthGuard]},
  
  { path: 'manage-jobs', component: ManageJobsComponent , canActivate: [AuthGuard]},
  { path: 'apply-jobs', component: ApplyJobsComponent, canActivate: [AuthGuard] },
  { path: 'my-jobs', component: MyJobsComponent , canActivate: [AuthGuard]},
  { path: 'job-details', component: JobDetailsComponent , canActivate: [AuthGuard]},
  { path: 'job-applications', component: JobApplicationsComponent , canActivate: [AuthGuard]},
  

  // Lazy-load the AuthModule for all 'auth' routes
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  // { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
  // If no route is matched at the app level, redirect to the 404 page inside AuthModule
  { path: '**', redirectTo: 'auth/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
