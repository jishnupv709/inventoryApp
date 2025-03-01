import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  // When users navigate to 'auth/login', show the LoginComponent.
  { path: 'login', component: LoginComponent },
  
  // 404 Route for any auth paths that do not match.
  { path: '404', component: PageNotFoundComponent },
  // Wildcard within the AuthModule: Redirect any unknown auth routes to the 404 page.
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
