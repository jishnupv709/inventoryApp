import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemMasterComponent } from './inventory/item-master/item-master.component';
import { ToggleRendererComponent } from './inventory/toggle-renderer.component';
import { EditActionRendererComponent } from './inventory/edit-action-renderer.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryComponent } from './inventory/category/category.component';
import { RemoveActionRendererComponent } from './inventory/remove-action-renderer.component';
import { ConfirmationPopComponent } from './confirmation-pop/confirmation-pop.component';
import { ManageJobsComponent } from './jobs/manage-jobs/manage-jobs.component';
import { ApplyJobsComponent } from './jobs/apply-jobs/apply-jobs.component';
import { MyJobsComponent } from './jobs/my-jobs/my-jobs.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { JobApplicationsComponent } from './jobs/job-applications/job-applications.component';
import { JobActionRendererComponent } from './jobs/apply-jobs/job-actionrenderer.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    ItemMasterComponent,
    ToggleRendererComponent,
    EditActionRendererComponent,
    ProfileComponent,
    CategoryComponent,
    RemoveActionRendererComponent,
    ConfirmationPopComponent,
    ManageJobsComponent,
    ApplyJobsComponent,
    MyJobsComponent,
    JobDetailsComponent,
    JobApplicationsComponent,
    JobActionRendererComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
