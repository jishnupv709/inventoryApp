import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register' || this.router.url === '/' || this.router.url =='/auth/login' || this.router.url =='/auth/404' || this.router.url =='/auth/signup';
  }
}
