import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private commonService: CommonService, private router: Router) {}

  canActivate(): boolean {
    if (this.commonService.isLoggedIn()) {
      return true; // Allow navigation
    } else {
      this.router.navigate(['/auth/login']); // Redirect to login
      return false;
    }
  }
}
