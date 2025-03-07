import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
      private commonService: CommonService,
      private router: Router,
      private toastr: ToastrService
    ) { }
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading:boolean=false

  onSignUp() {
    
    // if(!this.name || !this.email  || !this.phone || this.password || this.confirmPassword) {
    //   this.toastr.warning("Enter all the fields","Warning");
    //   return;
    // }
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }
    console.log('User Registered:', { name: this.name, email: this.email, phone: this.phone });
    
    this.loading=true;
    let data = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password:this.password,
      userType:2
    }
    
    this.commonService.register('/auth/register', data).subscribe({
      next: (response) => {
        console.log('Full Response:', response);
    
        if (response && response.status && (response.status === 200 || response.status === 201)) {
          this.toastr.success('User Registered Successfully', 'Success');
          this.loading = false;
          this.router.navigate(['/auth/login']);
        }
      },
      error: (error) => {
        console.error('Registration Error:', error);
        this.toastr.error('Registration failed', 'Error');
        this.loading = false;
      }
    });
    
    
  }
 
}
