import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private commonService: CommonService, private router: Router) {}

  ngOnInit(): void {}
loading:boolean=false;
  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }
    this.loading=true;
    let data = {
      email: this.email,
      password:this.password
    }
    this.commonService.login('/auth/login', data).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.loading=false;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
         this.loading=false;
      }
    );
    
  }
//   getDesignation(){
//     let data = {
//       email: this.email,
//       password:this.password
//     }
//     this.commonService.postData('/auth/login',data).subscribe((res:any)=>{
//       console.log(res)
//     })
// }
}
