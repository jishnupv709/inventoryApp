import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    let data = {
      email: this.email,
      password:this.password
    }
    this.authService.postData('/auth/login', data).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
    
  }
//   getDesignation(){
//     let data = {
//       email: this.email,
//       password:this.password
//     }
//     this.authService.postData('/auth/login',data).subscribe((res:any)=>{
//       console.log(res)
//     })
// }
}
