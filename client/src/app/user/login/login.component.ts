import { Component } from '@angular/core';
import { AbstractControl, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/util/user-interfaces';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }
  errorMessage: string | null = null;
  isLoggingIn: boolean = false;

  login(form: NgForm): void {
    const formEmail: AbstractControl<any> = form.controls['email'];
    const formPassword: AbstractControl<any> = form.controls['password'];
    const params: LoginUser = {
      email: formEmail.value,
      password: formPassword.value,
    };
    this.isLoggingIn = true;
    this.errorMessage = null;

    if (params.email == '' || params.password == '') {
      this.errorMessage = 'Inputs cannot be empty'
    } else if (!formEmail.valid) {
      this.errorMessage = 'Invalid Email'
    } else if (!formPassword.valid) {
      this.errorMessage = 'Password must be longer than 6 characters'
    }
    if (this.errorMessage != null) {
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
      setTimeout(() => {
        this.isLoggingIn = false;
      }, 1000);
      return;
    }

    this.authService.login(params).subscribe(
      () => {
        this.isLoggingIn = false;
        this.errorMessage = null;
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        this.isLoggingIn = false;
        this.errorMessage = error.message;
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      })
  }

  recoverPassword(form: NgForm): void {

  }

}
